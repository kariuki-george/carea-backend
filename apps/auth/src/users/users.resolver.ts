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
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'libs/auth/admin-auth.guard';
import { JwtAuthGuard } from 'libs/auth/jwt-auth.guard';
import { UpdateRoleResponse } from './res/updateRole.res';
import { Address } from './entities/address.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AdminAuthGuard)
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
    @Args('createAddress') createAddress: CreateAddressDto
  ): Promise<Address> {
    return this.usersService.createAddress(createAddress);
  }

  /**
   * Update user profile
   */

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateProfile(@Args('profile') profile: UpdateUserInput): Promise<User> {
    return this.usersService.updateProfile(profile);
  }

  /**
   * Resend Verify email.
   */

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  resendVerifyEmail(@Args('userEmail') email: string): Promise<string> {
    return this.usersService.resendVerifyEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  beep() {
    return 'boop!';
  }

  /**
   * Update user role from Buyer to Subadmin
   */

  @UseGuards(AdminAuthGuard)
  @Mutation(() => UpdateRoleResponse)
  updateRole(
    @Args('userId') userId: string,
    @Context() context: any
  ): Promise<typeof UpdateRoleResponse> {
    return this.usersService.updateRole(userId, context.user);
  }
}
