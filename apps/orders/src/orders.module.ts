import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      cors: {
        credentials: true,
      },
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      plugins: [],
      
    }),
  ],

  providers: [OrdersService, PrismaService, OrdersResolver],
})
export class OrdersModule {}
