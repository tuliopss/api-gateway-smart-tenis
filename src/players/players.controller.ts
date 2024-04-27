import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { ValidationsParamsPipe } from 'src/commom/pipes/validationsParamsPipe.pipe';
import { isValidObjectId } from 'mongoose';
import { Ctx, RmqContext } from '@nestjs/microservices';

@Controller('/api/v1')
export class PlayersController {
  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post('/players')
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

  @Get('/players')
  getPlayers(): Observable<any> {
    return this.clientAdminBackend.send('get-players', '');
  }

  @Get('/players/:id')
  getPlayerById(@Param('id') id: string) {
    return this.clientAdminBackend.send('get-players-by-id', id);
  }

  @Patch('/players/:id')
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

  @Delete('/players/:id')
  @UsePipes(ValidationPipe)
  async deletePlayer(@Param('id', ValidationsParamsPipe) id: string) {
    await this.clientAdminBackend.emit('delete-player', id);
  }
}
