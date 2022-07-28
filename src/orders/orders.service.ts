import { Injectable } from '@nestjs/common';
import { AddMessageInput } from './dto/addMessage.dto';
import { CreateChatInput } from './dto/createChat.dto';
import { CreateOfferInput } from './dto/createOffer.dto';
import { UpdateOfferInput } from './dto/updateOffer.dto';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/messages.entity';
import { Offer, OfferStatus } from './entities/Offer.entity';
import { PrismaService } from 'libs/database/prisma.service';

import { CreateOfferResponse } from './res/createOffer.res';
import * as Chance from 'chance';
import { CreateOrderInput } from './dto/createOrder.dto';

import { CreateOrderResponse } from './res/createOrder.res';
import { Order } from './entities/Order.entity';
import { GetOffers } from './res/Offer.res';

interface validOffer {
  valid?: boolean;
  message?: string;
  offer?: Offer;
}

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

  getOffers(input: Partial<Offer>): Promise<GetOffers[]> {
    const { status, ...data } = input;
    return this.prismaService.offer.findMany({
      where: data,
      include: {
        car: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
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
      include: {
        car: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    if (existing) {
      return existing;
    }

    const chat = await this.prismaService.chat.create({
      data: { userId, carId },
      include: { car: { select: { name: true, imageUrl: true } } },
    });
    return chat;
  }

  addMessage(input: AddMessageInput): Promise<Message> {
    return this.prismaService.message.create({
      data: input,
    });
  }

  getChatsByUserId(userId: string): Promise<Chat[]> {
    return this.prismaService.chat.findMany({
      where: { userId },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },

          select: {
            message: true,
            createdAt: true,
          },
        },
        car: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  getMessages(chatId: string): Promise<Message[]> {
    return this.prismaService.message.findMany({ where: { chatId } });
  }

  getChatsCount(): Promise<number> {
    return this.prismaService.chat.count();
  }

  getChatById(id: string): Promise<Chat> {
    return this.prismaService.chat.findUnique({
      where: { id },
      include: {
        car: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  getMessagesCount(chatId: string): Promise<number> {
    return this.prismaService.message.count({ where: { chatId } });
  }
  async getChats(): Promise<Chat[]> {
    return this.prismaService.chat.findMany({
      include: {
        car: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },

          select: {
            message: true,
            createdAt: true,
          },
        },
      },
    });
  }

  acceptAndCreateOfferToken(id: string): Promise<Offer> {
    return this.prismaService.offer.update({
      where: { id },
      data: { status: OfferStatus.ACCEPTED },
    });
  }

  private async validateToken(token: string): Promise<validOffer> {
    const offer = await this.prismaService.offer.findUnique({
      where: { id: token },
    });

    if (offer) {
      //check if offer is alrady used
      if (offer.valid) {
        return {
          valid: true,
          offer,
        };
      } else {
        return {
          valid: false,
          message: 'Token already used!',
        };
      }
    } else {
      //if no offer, offer does exists.
      return {
        valid: false,
        message: "Token doesn't exist",
      };
    }
  }
  private deleteToken(id: string) {
    return this.prismaService.offer.delete({ where: { id } });
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
    const { token, ...data } = input;
    const order = await this.prismaService.order.create({ data });
    //if token, validate it
    let valideOffer: validOffer;
    if (token) {
      valideOffer = await this.validateToken(token);

      if (!valideOffer.valid) {
        return {
          order,
          offer: {
            error: true,
            message: valideOffer.message,
          },
        };
      }
      //update order
      await this.prismaService.order.update({
        where: { id: order.id },
        data: {
          offer: {
            connect: {
              id: token,
            },
          },
        },
      });
      //update offer validity

      return {
        order,
        offer: {
          offer: valideOffer.offer,
        },
      };
    }

    return {
      order,
    };
  }

  getOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }
  getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.prismaService.order.findMany({ where: { userId } });
  }

  
}
