import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],

  controllers: [PlayersController],
  // providers: [Player]
})
export class PlayersModule {}
