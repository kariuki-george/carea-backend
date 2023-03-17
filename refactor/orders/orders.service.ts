import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AddMessageInput } from './dto/addMessage.dto';
import { CreateChatInput } from './dto/createChat.dto';
import { CreateOfferInput } from './dto/createOffer.dto';
import { UpdateOfferInput } from './dto/updateOffer.dto';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/messages.entity';
import { Offer } from './entities/Offer.entity';
import { PrismaService } from 'src/providers/database/prisma.service';
import { CreateOfferResponse } from './res/createOffer.res';
import { CreateOrderInput } from './dto/createOrder.dto';
import { CreateOrderResponse } from './res/createOrder.res';
import { Order } from './entities/Order.entity';
import { GetOffers } from './res/Offer.res';
import { RmqService } from 'libs/rmq/rqm.service';
import { User } from 'src/auth/users/entities/user.entity';

interface validOffer {
  valid?: boolean;
  message?: string;
  offer?: Offer;
}

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private readonly emailService: RmqService
  ) {}

  async createOffer(
    input: CreateOfferInput,
    user: User
  ): Promise<typeof CreateOfferResponse> {
    try {
      const offer = await this.prismaService.offers.create({
        data: {
          carId: input.carId,
          userId: user.id,
          amount: input.amount,
        },
        include: {
          car: {
            select: {
              name: true,
            },
          },
        },
      });

      this.emailService.publish('OFFER', 'OFFERCREATED', {
        email: user.email,
        amount: input.amount,
        car: offer.car.name,
      });

      return {
        offer,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async updateOffer(input: UpdateOfferInput, user: User): Promise<Offer> {
    const { id, ...data } = input;
    // Check for the right permissions
    if (data.status) {
      // Only admin can update this
      if (user.role === 'BUYER') {
        throw new UnauthorizedException('User not authorized');
      }
    }
    const offer = await this.prismaService.offers.update({
      where: {
        id: input.id,
      },
      data,
      include: {
        car: {
          select: { name: true },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    await this.emailService.publish('OFFER', 'OFFERUPDATED', {
      email: offer.user.email,
      car: offer.car.name,
      status: offer.status,
      amount: offer.amount,
    });

    return offer;
  }

  getOffers(input: Partial<Offer>): Promise<GetOffers[]> {
    const { status, ...data } = input;
    return this.prismaService.offers.findMany({
      where: data,
      include: {
        car: {
          select: {
            name: true,
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
          },
        },
      },
    });

    if (existing) {
      return existing;
    }

    const chat = await this.prismaService.chats.create({
      data: { userId, carId },
      include: { car: { select: { name: true } } },
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
