import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
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

@Controller('/api/v1')
export class AppController {
  private logge = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    this.clientAdminBackend.emit('create-category', createCategoryDTO);
  }

  @Get('/categories')
  getCategories(): Observable<any> {
    return this.clientAdminBackend.send('get-categories', '');
  }

  // @Get('/categories/:id')
  // getCategoryById(@Param('id') id: string): Observable<any> {
  //   console.log('gat', id);
  //   return this.clientAdminBackend.send('get-categories-by-id', id);
  // }

  @Get('cate/:id')
  getCategoryById(@Param('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('get-categories-by-id', id);
  }
}
