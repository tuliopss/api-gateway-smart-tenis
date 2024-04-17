import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
('./interfaces/players/interfaces/player.schema');

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
