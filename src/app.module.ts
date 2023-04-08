import {
  Module,
  CacheModule,
  Global,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { EmailsModule } from '@/providers/emails/emails.module';
import { OrdersModule } from '@/modules/orders/orders.module';
import { PrismaModule } from 'src/providers/database/prisma.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './modules/auth/auth.module';
import { KafkaModule } from './providers/kafka/kafka.module';
import { RequestLoggerMiddleware } from './middlewares/request-logegr.middleware';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: ['https://studio.apollographql.com'],
      },
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      cache: 'bounded',
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      playground: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({}),
    }),

    CacheModule.register({
      isGlobal: true,
    }),

    PrismaModule.forRoot(),
    UsersModule,
    AuthModule,
    InventoryModule,
    KafkaModule,
    EmailsModule,
    OrdersModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
