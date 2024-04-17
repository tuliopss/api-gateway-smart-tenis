import {
  Body,
  Controller,
  Get,
  Logger,
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
    console.log('controler');
    return await this.clientAdminBackend.emit(
      'create-category',
      createCategoryDTO,
    );
  }
}
