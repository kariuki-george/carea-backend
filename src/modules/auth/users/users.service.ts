import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as argon2 from 'argon2';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { User, UserRoles } from './entities/user.entity';
import { CreateUserResponse } from './res/createUser.res';

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
import { PrismaService } from 'src/providers/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  /**
   * Finds user, updates tokens
   * @param email
   * @param password
   * @returns user
   */
  async validateUser(email: string, pass: string) {
    let user: User;
    // TODO: update tokens
    user = await this.getUser({ email });

    if (!user) {
      throw new UserInputError('User not found');
    }
    if (!user.verified) {
      throw new AuthenticationError('Your email is not verified!');
    }

    const passwordIsValid = await argon2.verify(user.password, pass);
    if (!passwordIsValid) {
      throw new UserInputError('Credentials are not valid');
    }
    const { password, ...formattedUser } = user;

    return formattedUser;
  }

  async getUser(getUserArgs: Partial<User>): Promise<User> {
    const { email, id } = getUserArgs;
    // Check in cache
    let user: User = await this.cacheService.get('user-' + id);
    if (user) {
      return user;
    }

    user = await this.prismaService.users.findUnique({
      where: {
        email,
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.cacheService.set('user-' + user.id, user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.prismaService.users.findMany();
  }

  async createUser(input: CreateUserInput): Promise<typeof CreateUserResponse> {
    /**validate email  */
    let user: User;

    try {
      user = await this.prismaService.users.create({
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

      return {
        error: true,
        message: 'An error occurred! ',
      };
    }

    /**
     * send verify email
     */

    // create a token
    try {
      const token = this.createToken();
      await this.prismaService.users.update({
        where: { id: user.id },
        data: { emailVerifyToken: token },
      });
      await this.sendVerifyEmail(user.email, token);

      return user;
    } catch (error) {
      // TODO: handle errors
    }
  }

  private async sendEmail(pattern: string, data: {}) {
    this.emailService.publish('EMAIL', pattern, data);
    //await lastValueFrom(this.emailClient.emit(pattern, data));
  }

  async verifyEmail({
    token,
    email,
  }: VerifyEmailDto): Promise<typeof VerifyEmailResponse> {
    // Check if email is valid
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (!user) {
      return {
        error: true,
        message: "This user doesn't exist",
      };
    }

    if (user.emailVerifyToken != token) {
      return {
        error: true,
        message: 'Invalid token!',
      };
    }

    await this.prismaService.users.update({
      where: { email },
      data: { verified: true, emailVerifyToken: null },
    });
    return {
      success: true,
    };
  }

  private async sendVerifyEmail(email: string, token: string) {
    await this.sendEmail('user_verifyEmail', {
      email: email,
      token,
      name: email.split('@')[0],
    });
  }

  private createToken() {
    const chance = new Chance();
    const token = chance.hash();
    return token;
  }

  async resendVerifyEmail(email: string): Promise<typeof VerifyEmailResponse> {
    // Verify user exists
    const user = await this.getUser({ email });
    if (!user) {
      return { error: true, message: 'user not found' };
    }

    await this.sendVerifyEmail(email, user.emailVerifyToken);
    return { message: 'Check your email!', success: true };
  }

  async changePasswordRequest(email: string): Promise<string> {
    // Validate email
    const user = await this.getUser({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.createToken();
    // Save this token
    await this.prismaService.users.update({
      where: { id: user.id },
      data: { passwordChangeToken: token },
    });

    await this.cacheService.del('user-' + user.id);
    await this.sendEmail('user_passwordReset', { email, token });
    return 'Check your email!';
  }

  async changePassword({
    token,
    email,
    password,
  }: ChangePasswordDto): Promise<typeof ChangePasswordRequestResponse> {
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
      },
    });

    return {
      success: true,
    };
  }

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

  async updateRole(
    userId: number,
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

    await this.prismaService.users.update({
      where: { id: userId },
      data: {
        role: UserRoles.SUBADMIN,
      },
    });
    return {
      success: true,
    };
  }

  getAddressesByUserId(userId: number): Promise<Address[]> {
    return this.prismaService.addresses.findMany({ where: { userId } });
  }
}
