import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { PlayersModule } from './players/players.module';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import { AwsModule } from './aws/aws.module';
('./interfaces/players/interfaces/player.schema');
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ProxyRMQModule,
    PlayersModule,
    CategoriesModule,
    AwsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
