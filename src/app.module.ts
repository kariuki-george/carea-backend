import { Module, CacheModule, Global } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { EmailsModule } from '@/providers/emails/emails.module';
import { OrdersModule } from '@/modules/orders/orders.module';
import { PrismaModule } from 'src/providers/database/prisma.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AuthModule } from './modules/auth/auth.module';
import { redisStore } from 'cache-manager-redis-yet';
import { KafkaModule } from './providers/kafka/kafka.module';

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
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          ttl: 1000 * 60 * 3,
          url: configService.getOrThrow('REDIS_URI'),
        }),
      }),
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
export class AppModule {}
