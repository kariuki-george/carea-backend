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
    const { id, ...data } = input;
    try {
      const offer = await this.prismaService.offers.upsert({
        where: {
          id: id,
        },
        update: { status: OfferStatus.PROCESSING, amount: input.amount },
        create: {
          carId: data.carId,
          userId: data.userId,
          amount: data.amount,
        },
      });

      return {
        offer,
      };
    } catch (error) {
      //Will require a double call as prisma does not perform findAndUpdate...
      if (error.code === 'P2002') {
        const offer = await this.prismaService.offers.findFirst({
          where: {
            AND: {
              carId: input.carId,
              userId: input.userId,
            },
          },
          select: {
            id: true,
          },
        });

        return {
          offer: await this.prismaService.offers.update({
            where: { id: offer.id },
            data: { amount: input.amount },
          }),
        };
      }
      return {
        error: true,
        message: 'An error occurred!',
      };
    }
  }

  updateOffer(input: UpdateOfferInput): Promise<Offer> {
    const { id, ...data } = input;
    return this.prismaService.offers.update({
      where: {
        id: input.id,
      },
      data,
    });
  }

  getOffers(input: Partial<Offer>): Promise<GetOffers[]> {
    const { status, ...data } = input;
    return this.prismaService.offers.findMany({
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
    const existing = await this.prismaService.chats.findFirst({
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

    const chat = await this.prismaService.chats.create({
      data: { userId, carId },
      include: { car: { select: { name: true, imageUrl: true } } },
    });
    return chat;
  }

  addMessage(input: AddMessageInput): Promise<Message> {
    return this.prismaService.messages.create({
      data: input,
    });
  }

  getChatsByUserId(userId: number): Promise<Chat[]> {
    return this.prismaService.chats.findMany({
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

  getMessages(chatId: number): Promise<Message[]> {
    return this.prismaService.messages.findMany({ where: { chatId } });
  }

  getChatsCount(): Promise<number> {
    return this.prismaService.chats.count();
  }

  getChatById(id: number): Promise<Chat> {
    return this.prismaService.chats.findUnique({
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

  getMessagesCount(chatId: number): Promise<number> {
    return this.prismaService.messages.count({ where: { chatId } });
  }
  async getChats(): Promise<Chat[]> {
    return this.prismaService.chats.findMany({
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

  acceptAndCreateOfferToken(id: number): Promise<Offer> {
    return this.prismaService.offers.update({
      where: { id },
      data: { status: OfferStatus.ACCEPTED },
    });
  }

  // TODO: UPDATE THE ARGS
  private async validateToken(token: string): Promise<validOffer> {
    const offer = await this.prismaService.offers.findUnique({
      where: {},
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
  private deleteToken(id: number) {
    return this.prismaService.offers.delete({ where: { id } });
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
    const { token, ...data } = input;
    const order = await this.prismaService.orders.create({ data });
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
      // await this.prismaService.orders.update({
      //   where: { id: order.id },
      //   data: {
      //     offer: {
      //       connect: {
      //         id: token,
      //       },
      //     },
      //   },
      // });
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
    return this.prismaService.orders.findMany();
  }
  getOrdersByUserId(userId: number): Promise<Order[]> {
    return this.prismaService.orders.findMany({ where: { userId } });
  }
}
