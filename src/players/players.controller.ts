import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { ValidationsParamsPipe } from 'src/commom/pipes/validationsParamsPipe.pipe';
import { isValidObjectId } from 'mongoose';
import { Ctx, RmqContext } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { Player } from './interfaces/Player.interface';

@Controller('/api/v1/players')
export class PlayersController {
  logger = new Logger(PlayersController.name);

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking,
    private awsService: AwsService,
  ) {}
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    const category = await this.clientAdminBackend.send(
      'get-categories-by-id',
      createPlayerDTO.category,
    );

    if (!category) {
      throw new BadRequestException(`Category not registred`);
    }

    await this.clientAdminBackend.emit('create-player', createPlayerDTO);
  }

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('id') id: string) {
    const playerFound = await lastValueFrom(
      this.clientAdminBackend.send('get-players-by-id', id),
    );

    if (!playerFound) {
      throw new NotFoundException('Player not found');
    }

    const urlPlayerPhoto = await this.awsService.uploadFile(file, id);

    const updatePlayerDTO: UpdatePlayerDTO = {};
    updatePlayerDTO.urlPlayerPhoto = urlPlayerPhoto.url;

    await this.clientAdminBackend.emit('update-player', {
      id,
      updatePlayerDTO,
    });

    return this.clientAdminBackend.send('get-players-by-id', id);

    // return urlPhoto;
  }

  @Get()
  getPlayers(): Observable<any> {
    return this.clientAdminBackend.send('get-players', '');
  }

  @Get(':id')
  getPlayerById(@Param('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('get-players-by-id', id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('id', ValidationsParamsPipe) id: string,
    @Body() updatePlayerDTO: UpdatePlayerDTO,
  ) {
    if (!isValidObjectId(updatePlayerDTO.category)) {
      throw new BadRequestException('Invalid ID');
    }

    const category = await lastValueFrom(
      this.clientAdminBackend.send(
        'get-categories-by-id',
        updatePlayerDTO.category,
      ),
    );

    if (!category) {
      throw new BadRequestException('Category not registred');
    }

    await this.clientAdminBackend.emit('update-player', {
      id,
      updatePlayerDTO,
    });
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  async deletePlayer(@Param('id', ValidationsParamsPipe) id: string) {
    await this.clientAdminBackend.emit('delete-player', id);
  }
}
