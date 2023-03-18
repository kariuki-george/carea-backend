import { Module, CacheModule, Global } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
// import { CareaModule } from './modules/carea/carea.module';
// import { EmailsModule } from './providers/emails/emails.module';
// import { OrdersModule } from './modules/orders/orders.module';
import { PrismaModule } from 'src/providers/database/prisma.module';
// import { StatisticsModule } from './modules/statistics/statistics.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './modules/auth/auth.module';

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
    PrismaModule.forRoot(),
    UsersModule,
    AuthModule,
    // CareaModule,
    // EmailsModule,
    // OrdersModule,

    // StatisticsModule,
  ],
  providers: [],
})
export class AppModule {}
