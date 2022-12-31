import { Module, CacheModule, Global } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CareaModule } from './carea/carea.module';
import { EmailsModule } from './emails/emails.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from 'libs/database/prisma.module';
import { RmqModule } from 'libs/rmq/rmq.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ApolloServerPluginLandingPageLocalDefault } from '.pnpm/apollo-server-core@3.11.1_graphql@16.6.0/node_modules/apollo-server-core';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: [
          'http://localhost:3000',
          'http://localhost:3100',
          '/.vercel.app$/',
          'https://ssl.kariukigeorge.me/graphql',
          'https://studio.apollographql.com',
        ],
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

      validationSchema: Joi.object({}),
    }),
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    CareaModule,
    EmailsModule,
    OrdersModule,
    PrismaModule.forRoot(),
    RmqModule,
    StatisticsModule,
  ],
  providers: [],
})
export class AppModule {}
