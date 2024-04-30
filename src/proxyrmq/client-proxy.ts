import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxySmartRanking {
  constructor(private configService: ConfigService) {}

  getClientProxyAdminBackendInstance(): ClientProxy {
    const RABBITMQ_USER = this.configService.get<string>('RABBITMQ_USER');
    const RABBITMQ_PASSWORD =
      this.configService.get<string>('RABBITMQ_PASSWORD');
    const RABBITMQ_URL = this.configService.get<string>('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        // urls: ['amqp://guest:guest@localhost:5672'],
        urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_URL}`],
        queue: 'admin-backend',
      },
    });
  }
}
