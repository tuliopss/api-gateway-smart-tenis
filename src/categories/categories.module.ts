import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoryController],
})
export class CategoriesModule {}
