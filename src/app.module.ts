import { Module, CacheModule, Global } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CareaModule } from './modules/carea/carea.module';
import { EmailsModule } from './providers/emails/emails.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PrismaModule } from 'src/providers/database/prisma.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

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

    StatisticsModule,
  ],
  providers: [],
})
export class AppModule {}
