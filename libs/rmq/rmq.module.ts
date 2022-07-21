import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmqService } from './rqm.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        exchanges: [
          {
            name: 'EMAIL',
            type: 'direct',
          },
        ],
        uri: config.get<string>('RABBIT_MQ_URI'),
        connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
      }),
    }),
  ],
  providers: [RmqService],
  exports: [RmqModule, RabbitMQModule, RmqService],
})
export class RmqModule implements OnModuleInit {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async onModuleInit(): Promise<void> {
    const connection = await this.amqpConnection.managedConnection;
    connection.on('disconnect', (opts) => {
      if (opts.err) {
        Logger.error('Amqp error', opts.err.stack, 'AppModule.amqpConnection');
        process.exit(1);
      }

      Logger.warn('Amqp disconnect', "AppModule.amqpConnection'");
    });
  }
}
