import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/loginInput.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponse } from './res/login.res';
import { JwtAuthGuard } from './guards/jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') _: LoginInputDto,
    @Context() context
  ): Promise<LoginResponse> {
    const { refreshToken, ...value } = await this.authService.login(
      context.user
    );
    context.res.cookie('rid', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: false, //TODO: UPDATE FOR STRICTER SECURITY,
    });

    return value;
  }

  @Mutation(() => String, { description: 'Returns an accessToken' })
  async refreshToken(@Context() context): Promise<string> {
    if (!context.req.cookies.rid) {
      throw new BadRequestException('Please provide a refresh token');
    }
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      context.req.cookies.rid
    );

    context.res.cookie('rid', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: false, //TODO: UPDATE FOR STRICTER SECURITY
    });

    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async logout(@Context() context): Promise<boolean> {
    await this.authService.logout(context.req.user.id);
    context.res.cookie('rid', '', { maxAge: 0, httpOnly: true });
    return true;
  }
}
