import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import * as Joi from 'joi';
import { AuthModule } from 'libs/auth/auth.module';
import { RmqModule } from 'libs/rmq/rmq.module';
import { CareaResolver } from './app.resolver';
import { AppService } from './app.service';

import { PrismaService } from './prisma.service';

@Module({
  imports: [
    RmqModule,

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      cors: {
        credentials: true,
      },
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/auth/.env'],
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        //RABBIT_MQ_EMAIL_QUEUE: Joi.string().required(),
      }),
    }),


    CacheModule.register(),
    AuthModule,
  ],
  providers: [AppService, CareaResolver, PrismaService],
})
export class AppModule {}
