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

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        credentials: true,
      },
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
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
    
  ],
  providers: [],
})
export class AppModule {}
