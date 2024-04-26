import { ClientProxySmartRanking } from './../proxyrmq/client-proxy';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Observable } from 'rxjs';
import { UpdateCategoryDTO } from './dtos/update-category-dto';

@Controller('/api/v1')
export class CategoryController {
  private logge = new Logger(CategoryController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  // constructor() {
  //   this.clientAdminBackend = ClientProxyFactory.create({
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://guest:guest@localhost:5672'],
  //       queue: 'admin-backend',
  //     },
  //   });
  // }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    this.clientAdminBackend.emit('create-category', createCategoryDTO);
  }

  @Get('/categories')
  getCategories(): Observable<any> {
    return this.clientAdminBackend.send('get-categories', '');
  }

  @Get('categories/:id')
  getCategoryById(@Param('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('get-categories-by-id', id);
  }

  @Patch('category/:id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return this.clientAdminBackend.emit('update-category', {
      id,
      category: updateCategoryDTO,
    });
  }
}
