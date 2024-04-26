import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { PlayersModule } from './players/players.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
('./interfaces/players/interfaces/player.schema');

@Module({
  imports: [ProxyRMQModule, PlayersModule, CategoriesModule],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
