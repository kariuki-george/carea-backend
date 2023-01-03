import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './res/login.res';
import { UserRoles } from './users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login Flow for carea/buyers 
    
   */
  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginInput: LoginInputDto,
    @Context() context
  ): Promise<typeof LoginResponse> {
    return this.authService.login(context);
  }
  /**
   * Login Flow for carea/buyers
   */
  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  loginAdmin(
    @Args('loginInput') loginInput: LoginInputDto,

    @Context() context
  ): Promise<typeof LoginResponse> | typeof LoginResponse {
    if (context.user.role === UserRoles.BUYER) {
      return {
        error: true,
        message: 'Account not authorized to access this resource',
      };
    }

    return this.authService.login(context);
  }
}
