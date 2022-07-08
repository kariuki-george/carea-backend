import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './res/login.res';

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
