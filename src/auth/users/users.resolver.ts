import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserResponse } from './res/createUser.res';
import { VerifyEmailResponse } from './res/verifyEmail.res';
import { ChangePasswordDto } from './dto/change-password.input';
import { ChangePasswordRequestResponse } from './res/changePasswordRequest.res';
import { CreateAddressDto } from './dto/create-address.input';
import { VerifyEmailDto } from './dto/verify-email.input';
import { UpdateRoleResponse } from './res/updateRole.res';
import { Address } from './entities/address.entity';
import { SearchUserInput } from './dto/searchUser.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  /**
   * Create a user. A verify email is sent to the email provided.
   */
  @Mutation(() => CreateUserResponse)
  createUser(
    @Args('createUser') createUser: CreateUserInput
  ): Promise<typeof CreateUserResponse> {
    return this.usersService.createUser(createUser);
  }
  /**
   * Verify the email validity
   */

  @Mutation(() => VerifyEmailResponse)
  verifyUserEmail(
    @Args('verifyUser') verifyUserEmail: VerifyEmailDto
  ): Promise<typeof VerifyEmailResponse> {
    return this.usersService.verifyEmail(verifyUserEmail);
  }
  /**
   * Request a change password event. An email with auth token is sent to the user's email.
   */

  @Mutation(() => String)
  changePasswordRequest(
    @Args('changePasswordRequestEmail') email: string
  ): Promise<string> {
    return this.usersService.changePasswordRequest(email);
  }
  /**
   * Change password function with token authentication.Token provided by changePasswordRequest Mutation
   */

  @Mutation(() => ChangePasswordRequestResponse)
  changePassword(
    @Args('changePassword') changePassword: ChangePasswordDto
  ): Promise<typeof ChangePasswordRequestResponse> {
    return this.usersService.changePassword(changePassword);
  }
  /**
   *Create an address for the user. A user can create multiple addresses sequentially.
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  createAddress(
    @Args('createAddress') createAddress: CreateAddressDto,
    @Context() ctx
  ): Promise<Address> {
    return this.usersService.createAddress(createAddress, ctx.req.user.id);
  }

  /**
   * Update user profile
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateProfile(
    @Args('profile') profile: UpdateUserInput,
    @Context() ctx
  ): Promise<User> {
    return this.usersService.updateProfile(profile, ctx.req.user.id);
  }

  /**
   * Resend Verify email.
   */

  @Mutation(() => VerifyEmailResponse)
  resendVerifyEmail(
    @Args('userEmail') email: string
  ): Promise<typeof VerifyEmailResponse> {
    return this.usersService.resendVerifyEmail(email);
  }

  @Query(() => String)
  beep() {
    return 'boop!';
  }

  /**
   * Update user role from Buyer to Subadmin
   */

  @Mutation(() => UpdateRoleResponse)
  updateRole(
    @Args('userId') userId: number,
    @Context() context: any
  ): Promise<typeof UpdateRoleResponse> {
    return this.usersService.updateRole(userId, context.user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Address])
  getAddresses(@Context() ctx) {
    return this.usersService.getAddressesByUserId(ctx.req.user.id);
  }

  @Query(() => User)
  getUserByEmailOrId(@Args('input') input: SearchUserInput): Promise<User> {
    return this.usersService.getUser(input);
  }
}
