import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import * as Chance from 'chance';
import { Cache } from 'cache-manager';
import { VerifyEmailResponse } from './res/verifyEmail.res';
import { ChangePasswordRequestResponse } from './res/changePasswordRequest.res';
import { CreateAddressDto } from './dto/create-address.input';
import { ChangePasswordDto } from './dto/change-password.input';
import { VerifyEmailDto } from './dto/verify-email.input';
import { UpdateUserInput } from './dto/update-user.input';

import { Address } from './entities/address.entity';
import { PrismaService } from 'src/providers/database/prisma.service';
import { ProducerService } from '@/providers/kafka/producer/producer.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly producerService: ProducerService
  ) {}

  /**
   * Users
   */

  /**
   * Finds user, updates tokens
   * @param email
   * @param password
   * @returns user
   */
  async validateUser(email: string, pass: string): Promise<User> {
    // TODO: update tokens

    const user = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.verified) {
      throw new BadRequestException('Your email is not verified!');
    }

    const passwordIsValid = await argon2.verify(user.password, pass);
    if (!passwordIsValid) {
      throw new BadRequestException('Credentials are not valid');
    }

    delete user.password;

    // TODO: Remove password
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    // Check in cache

    let user: User;
    user = await this.cacheService.get('user-' + email);
    if (user) {
      return user;
    }

    user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    await this.cacheService.set('user-' + user.email, user);

    return user;
  }

  async getUserById(id: number): Promise<User> {
    // Check in cache

    let user: User;
    user = await this.cacheService.get('user-' + id);
    if (user) {
      return user;
    }

    user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    await this.cacheService.set('user-' + user.id, user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.prismaService.users.findMany();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    /**validate email  */
    let user: User;

    try {
      const token = this.createToken();
      user = await this.prismaService.users.create({
        data: {
          email: input.email,
          password: await argon2.hash(input.password),
          emailVerifyToken: token,
        },
      });

      // Create User Event
      await this.producerService.produce({
        topic: 'users.create',
        messages: [
          {
            value: JSON.stringify({
              email: user.email,
              userId: user.id,
              token,
            }),
            key: user.id.toString(),
          },
        ],
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already in use');
      }

      throw new Error(error.message || error.response.message);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    // Can be improved to delete other user data asynchronously
    await this.prismaService.users.delete({ where: { id: userId } });
    return true;
  }

  async verifyEmail({
    token,
    email,
  }: VerifyEmailDto): Promise<VerifyEmailResponse> {
    // Check if email is valid
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (user.emailVerifyToken != token) {
      throw new BadRequestException('Invalid Token or Token already used');
    }

    await this.prismaService.users.update({
      where: { email },
      data: { verified: true, emailVerifyToken: null },
    });
    return {
      success: true,
    };
  }

  private createToken() {
    const chance = new Chance();
    const token = chance.hash();
    return token;
  }

  async resendVerifyEmail(email: string): Promise<VerifyEmailResponse> {
    // Verify user exists
    const user = await this.getUserByEmail(email);

    await this.producerService.produce({
      topic: 'users.verifyEmail',
      messages: [
        {
          value: JSON.stringify({
            email: user.email,
            userId: user.id,
            token: user.emailVerifyToken,
            firstName: email.split('@')[0],
          }),
          key: user.id.toString(),
        },
      ],
    });

    return { success: true };
  }

  async changePasswordRequest(email: string): Promise<string> {
    // Validate email
    const user = await this.getUserByEmail(email);

    const token = this.createToken();
    // Save this token
    await this.prismaService.users.update({
      where: { id: user.id },
      data: { passwordChangeToken: token },
    });

    await this.cacheService.del('user-' + user.id);
    await this.producerService.produce({
      topic: 'users.passwordReset',
      messages: [
        {
          value: JSON.stringify({
            email: user.email,
            userId: user.id,
            token,
            firstName: user.firstName || email.split('@')[0],
          }),
          key: user.id.toString(),
        },
      ],
    });
    return 'Check your email!';
  }

  async changePassword({
    token,
    email,
    password,
  }: ChangePasswordDto): Promise<ChangePasswordRequestResponse> {
    //  Validate token
    /**
     * update user password
     */

    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.passwordChangeToken != token) {
      throw new BadRequestException('Token is invalid');
    }

    await this.prismaService.users.update({
      where: { email },
      data: {
        password: await argon2.hash(password),
        passwordChangeToken: null,
      },
    });

    return {
      success: true,
    };
  }
  /**
   *
   * User addresses and profile
   */

  createAddress(
    { name, details }: CreateAddressDto,
    userId: number
  ): Promise<Address> {
    return this.prismaService.addresses.create({
      data: {
        details,
        name,
        userId,
      },
    });
  }

  updateProfile(profile: UpdateUserInput, userId: number): Promise<User> {
    return this.prismaService.users.update({
      where: { id: userId },
      data: profile,
    });
  }

  getAddressesByUserId(userId: number): Promise<Address[]> {
    return this.prismaService.addresses.findMany({ where: { userId } });
  }

  async deleteAddress(addressId: number): Promise<boolean> {
    await this.prismaService.addresses.delete({ where: { id: addressId } });
    return true;
  }
}
