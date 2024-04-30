import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { AwsService } from 'src/aws/aws.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [ProxyRMQModule, AwsModule],

  controllers: [PlayersController],
  // providers: [Player]
})
export class PlayersModule {}
