import { Injectable } from '@nestjs/common';
import {  AddMessageInput } from './dto/addMessage.dto';
import { CreateChatInput } from './dto/createChat.dto';
import { CreateOfferInput } from './dto/createOffer.dto';
import { UpdateOfferInput } from './dto/updateOffer.dto';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/messages.entity';
import { Offer, OfferStatus } from './entities/Offer.entity';
import { PrismaService } from './prisma.service';
import { CreateOfferResponse } from './res/createOffer.res';

@Injectable()
export class OrdersService {
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
    return this.prismaService.offer.findMany({ where: { ...input } });
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

  getChatsByUserId(userId: string):Promise<Chat[]> {
    return this.prismaService.chat.findMany({
      where: { userId },
    });
  }

  getMessages(chatId: string):Promise<Message[]> {
    return this.prismaService.message.findMany({ where: { chatId } });
  }

  getChatsCount():Promise<number> {
    return this.prismaService.chat.count();
  }
  getMessagesCount(chatId: string):Promise<number> {
    return this.prismaService.message.count({ where: { chatId } });
  }
  getChats():Promise<Chat[]>{
    return this.prismaService.chat.findMany()
  }
}
