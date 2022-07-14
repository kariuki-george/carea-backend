import { Injectable } from '@nestjs/common';
import { AddMessageInput } from './dto/addMessage.dto';
import { CreateChatInput } from './dto/createChat.dto';
import { CreateOfferInput } from './dto/createOffer.dto';
import { UpdateOfferInput } from './dto/updateOffer.dto';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/messages.entity';
import { Offer, OfferStatus } from './entities/Offer.entity';
import { PrismaService } from './prisma.service';
import { CreateOfferResponse } from './res/createOffer.res';
import * as Chance from 'chance';
import { CreateOrderInput } from './dto/createOrder.dto';
import { Prisma } from '@prisma/orders/client';

@Injectable()
export class OrdersService {
  private readonly chance = new Chance();
  constructor(private prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createOffer(
    input: CreateOfferInput
  ): Promise<typeof CreateOfferResponse> {
    const exists = await this.prismaService.offer.findFirst({
      where: {
        AND: {
          carId: input.carId,
          userId: input.userId,
        },
      },
    });
    if (exists) {
      return {
        error: true,
        message: 'Offer already exists, Update it instead!',
      };
    }

    const offer = await this.prismaService.offer.create({
      data: input,
    });

    return {
      offer,
    };
  }

  updateOffer(input: UpdateOfferInput): Promise<Offer> {
    const { id, ...data } = input;
    return this.prismaService.offer.update({
      where: {
        id: input.id,
      },
      data,
    });
  }

  getOffers(input: Partial<Offer>): Promise<Offer[]> {
    const { status, ...data } = input;
    return this.prismaService.offer.findMany({ where: data });
  }

  async createChat({ userId, carId }: CreateChatInput): Promise<Chat> {
    //check if a chat room exists and return it...
    const existing = await this.prismaService.chat.findFirst({
      where: {
        AND: {
          userId,
          carId,
        },
      },
    });

    if (existing) {
      return existing;
    }

    return this.prismaService.chat.create({ data: { userId, carId } });
  }

  addMessage(input: AddMessageInput): Promise<Message> {
    return this.prismaService.message.create({
      data: input,
    });
  }

  getChatsByUserId(userId: string): Promise<Chat[]> {
    return this.prismaService.chat.findMany({
      where: { userId },
    });
  }

  getMessages(chatId: string): Promise<Message[]> {
    return this.prismaService.message.findMany({ where: { chatId } });
  }

  getChatsCount(): Promise<number> {
    return this.prismaService.chat.count();
  }
  getMessagesCount(chatId: string): Promise<number> {
    return this.prismaService.message.count({ where: { chatId } });
  }
  getChats(): Promise<Chat[]> {
    return this.prismaService.chat.findMany();
  }

  acceptAndCreateOfferToken(id: string): Promise<Offer> {
    return this.prismaService.offer.update({
      where: { id },
      data: { status: OfferStatus.ACCEPTED },
    });
  }
  private validateToken(token: string, userId: string): Promise<Offer> {
    return this.prismaService.offer.findFirst({
      where: { AND: { id: token, userId } },
    });
  }
  private deleteToken(id: string) {
    return this.prismaService.offer.delete({ where: { id } });
  }

  async createOrder(input: CreateOrderInput): Promise<{}> {
    const { token, ...data } = input;
    const order = await this.prismaService.order.create({ data });
    //if token, validate it
    let validOffer: Prisma.OfferMaxAggregateOutputType;
    if (token) {
      validOffer = await this.prismaService.offer.findUnique({
        where: { id: input.token },
      });
    }

    if (validOffer && !validOffer.orderId) {
      await this.prismaService.order.update({
        where: { id: order.id },
        data: {
          offer: {
            connect: {
              offerId: validOffer.id,
            },
          },
        },
      });
    } else {
      if (!validOffer) {
        return {
          error: true,
          message: "Token doesn't exist",
        };
      }
      if (validOffer.orderId) {
        return {
          error: true,
          message: 'Token already used',
        };
      }
    }
    return order;
  }

  getOrders() {
    //TODO: perform a filter
    return this.prismaService.order.findMany();
  }
 
}
