import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AnyArray } from 'mongoose';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './res/login.res';
import { User } from './users/entities/user.entity';
import { Whoami } from './whoami.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInputDto,

    @Context() context
   ): Promise<typeof LoginResponse> {
   
    return this.authService.login(context);
  }
}
