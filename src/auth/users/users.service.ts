import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as argon2 from 'argon2';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { User, UserRoles } from './entities/user.entity';
import { CreateUserResponse } from './res/createUser.res';
import { lastValueFrom } from 'rxjs';

import * as Chance from 'chance';
import { Cache } from 'cache-manager';
import { VerifyEmailResponse } from './res/verifyEmail.res';
import { ChangePasswordRequestResponse } from './res/changePasswordRequest.res';

import { CreateAddressDto } from './dto/create-address.input';
import { ChangePasswordDto } from './dto/change-password.input';
import { VerifyEmailDto } from './dto/verify-email.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateRoleResponse } from './res/updateRole.res';

import { Address } from './entities/address.entity';
import { PrismaService } from 'libs/database/prisma.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RmqService } from 'libs/rmq/rqm.service';
import { SearchUserInput } from './dto/searchUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: RmqService,

    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  async validateUser(email: string, password: string) {
    let user: User;

    user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new UserInputError('User not found');
    }
    if (!user.verified) {
      throw new AuthenticationError('Your email is not verified!');
    }

    const passwordIsValid = await argon2.verify(user.password, password);
    if (!passwordIsValid) {
      throw new UserInputError('Credentials are not valid');
    }

    return user;
  }
  getUser(getUserArgs: Partial<User>) {
    const { email, id } = getUserArgs;
    return this.prismaService.user.findUnique({
      where: {
        email,
        id,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(input: CreateUserInput): Promise<typeof CreateUserResponse> {
    /**validate email  */
    let user: User;
    try {
      user = await this.prismaService.user.create({
        data: {
          email: input.email,
          password: await argon2.hash(input.password),
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          error: true,
          message: 'Email already in use',
        };
      }
      console.log(error);
      return {
        error: true,
        message: 'An error occurred! ',
      };
    }

    /**
     * send verify email
     */
    await this.sendVerifyEmail(user.email);

    return user;
  }

  private async sendEmail(pattern: string, data: {}) {
    this.emailService.publish('EMAIL', pattern, data);
    //await lastValueFrom(this.emailClient.emit(pattern, data));
  }

  async verifyEmail({
    token,
    email,
  }: VerifyEmailDto): Promise<typeof VerifyEmailResponse> {
    const cache: { email: string } = await this.cacheService.get(token);

    if (!cache) {
      return {
        error: true,
        message: "Token already expired or doesn't exist!",
      };
    }

    if (cache.email !== email) {
      return {
        error: true,
        message: 'Invalid token!',
      };
    }

    await this.cacheService.del(token);
    await this.prismaService.user.update({
      where: { email },
      data: { verified: true },
    });
    return {
      success: true,
    };
  }

  private async sendVerifyEmail(email: string) {
    /**
     * create a token. Cache it with a specified ttl. Email token for verification.
     */

    const token = await this.createTokenAndCacheIt({ email });
    await this.sendEmail('user_verifyEmail', {
      email: email,
      token,
      name: email.split('@')[0],
    });
  }

  private async createTokenAndCacheIt(data: {}) {
    const chance = new Chance();
    const token = chance.hash();

    await this.cacheService.set(
      token,
      {
        ...data,
      },
      {
        ttl: 60 * 60,
      }
    );
    return token;
  }

  async resendVerifyEmail(email: string): Promise<string> {
    await this.sendVerifyEmail(email);
    return 'Check your email!';
  }

  async changePasswordRequest(email: string): Promise<string> {
    const token = await this.createTokenAndCacheIt({ email });
    await this.sendEmail('user_passwordReset', { email, token });
    return 'Check your email!';
  }

  async changePassword({
    token,
    email,
    password,
  }: ChangePasswordDto): Promise<typeof ChangePasswordRequestResponse> {
    const cache: { email: string } = await this.cacheService.get(token);
    /**
     * Validate email
     */
    if (!cache) {
      return {
        message: 'Sorry but token already expired. Try again!',
        error: true,
      };
    }
    if (cache.email !== email) {
      return {
        error: true,
        message: 'Sorry but wrong email provided. Try again!',
      };
    }
    await this.cacheService.del(token);

    /**
     * update user password
     */

    await this.prismaService.user.update({
      where: { email },
      data: {
        password: await argon2.hash(password),
      },
    });

    return {
      success: true,
    };
  }

  createAddress({ name, details, userId }: CreateAddressDto): Promise<Address> {
    return this.prismaService.addresses.create({
      data: {
        details,
        name,
        userId,
      },
    });
  }

  updateProfile(profile: UpdateUserInput): Promise<User> {
    const { userId, name, address, ...data } = profile;
    this.createAddress({ name, userId, details: address });
    return this.prismaService.user.update({
      where: { id: profile.userId },
      data,
    });
  }

  async updateRole(
    userId: string,
    admin: User
  ): Promise<typeof UpdateRoleResponse> {
    /**
     * Needs auth from admin. Check if user is admin.
     */

    // if (admin.role !== UserRoles.ADMIN) {
    //   return {
    //     error: true,
    //     message: "Only super Admin can update a user's roles",
    //   };
    // }

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        role: UserRoles.SUBADMIN,
      },
    });
    return {
      success: true,
    };
  }

  getAddressesByUserId(userId: string): Promise<Address[]> {
    return this.prismaService.addresses.findMany();
  }

  getUserByIdOrEmail(input: SearchUserInput): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: {
          email: {
            contains: input.email,
          },
          id: input.id,
        },
      },
    });
  }
}
