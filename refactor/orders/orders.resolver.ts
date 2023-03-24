import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AddMessageInput } from './dto/addMessage.dto';
import { CreateChatInput } from './dto/createChat.dto';
import { CreateOfferInput } from './dto/createOffer.dto';
import { CreateOrderInput } from './dto/createOrder.dto';
import { GetOfferInput } from './dto/getOffer.dto';
import { UpdateOfferInput } from './dto/updateOffer.dto';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/messages.entity';
import { Offer } from './entities/Offer.entity';
import { Order } from './entities/Order.entity';
import { OrdersService } from './orders.service';
import { CreateOfferResponse } from './res/createOffer.res';
import { CreateOrderResponse } from './res/createOrder.res';
import { GetOffers } from './res/Offer.res';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateOfferResponse)
  createOffer(
    @Args('createOffer') createOffer: CreateOfferInput, @Context() ctx
  ): Promise<typeof CreateOfferResponse> {
    return this.ordersService.createOffer(createOffer,ctx.req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Offer)
  updateOffer(
    @Args('updateOffer') updateOffer: UpdateOfferInput,@Context() ctx
  ): Promise<Offer> {
    return this.ordersService.updateOffer(updateOffer,ctx.req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [GetOffers], {
    description: 'If no inputs, returns all offers else by input',
  })
  
  getOffers(@Args('getOffer') getOffers: GetOfferInput): Promise<GetOffers[]> {
    return this.ordersService.getOffers(getOffers);
  }

  @Mutation(() => Chat)
  createChat(@Args('createChat') input: CreateChatInput): Promise<Chat> {
    return this.ordersService.createChat(input);
  }
  @Mutation(() => Message, { description: 'Add message to chat' })
  addMessage(@Args('addMessage') input: AddMessageInput): Promise<Message> {
    return this.ordersService.addMessage(input);
  }

  @Query(() => [Chat])
  getChatsByUserId(@Args('userId') userId: number): Promise<Chat[]> {
    return this.ordersService.getChatsByUserId(userId);
  }

  @Query(() => [Message])
  getMessages(@Args('chatId') chatId: number): Promise<Message[]> {
    return this.ordersService.getMessages(chatId);
  }

  @Query(() => Chat)
  getChatById(@Args('chatId') chatId: number): Promise<Chat> {
    return this.ordersService.getChatById(chatId);
  }

  @Query(() => Int)
  getMessagesCount(@Args('chatId') chatId: number): Promise<number> {
    return this.ordersService.getMessagesCount(chatId);
  }
  @Query(() => Int)
  getChatsCount(): Promise<number> {
    return this.ordersService.getChatsCount();
  }
  @Query(() => [Chat])
  getChats(): Promise<Chat[]> {
    return this.ordersService.getChats();
  }


  @Mutation(() => CreateOrderResponse, {
    description: 'Takes in an optional token argument',
  })
  createOrder(
    @Args('createOrder') input: CreateOrderInput
  ): Promise<CreateOrderResponse> {
    return this.ordersService.createOrder(input);
  }

  @Query(() => [Order])
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }
  @Query(() => [Order])
  getOrdersByUserId(@Args('UserId') userId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }
}