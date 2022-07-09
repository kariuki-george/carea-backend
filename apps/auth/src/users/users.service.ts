import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UsersRepo } from './users.repository';
import * as argon2 from 'argon2';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { User, UserRoles } from './entities/user.entity';
import { CreateUserResponse } from './res/createUser.res';
import { lastValueFrom } from 'rxjs';
import { EMAIL_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import * as Chance from 'chance';
import { Cache } from 'cache-manager';
import { VerifyEmailResponse } from './res/verifyEmail.res';
import { ChangePasswordRequestResponse } from './res/changePasswordRequest.res';
import { Types } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.input';
import { ChangePasswordDto } from './dto/change-password.input';
import { VerifyEmailDto } from './dto/verify-email.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateRoleResponse } from './res/updateRole.res';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepo,
    @Inject(EMAIL_SERVICE) private readonly emailClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  async validateUser(email: string, password: string) {
    let user: User;

    user = await this.usersRepo.findOne({ email });

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
    return this.usersRepo.findOne(getUserArgs);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find({});
  }

  async createUser(input: CreateUserInput): Promise<typeof CreateUserResponse> {
    /**validate email  */

    const user = await this.usersRepo.findOne({
      email: input.email,
    });

    if (user) {
      return {
        error: true,
        message: 'Email already in use!',
      };
    }

    const newUser = await this.usersRepo.create({
      ...input,
      password: await argon2.hash(input.password),
    });

    /**
     * send verify email
     */
    await this.sendVerifyEmail(newUser.email);

    return newUser;
  }

  private async sendEmail(pattern: string, data: {}) {
    await lastValueFrom(this.emailClient.emit(pattern, data));
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
    await this.usersRepo.findOneAndUpdate(
      { email },
      { $set: { verified: true } }
    );
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

    await this.usersRepo.findOneAndUpdate(
      { email },
      {
        $set: {
          password: await argon2.hash(password),
        },
      }
    );

    return {
      success: true,
    };
  }

  createAddress({ name, details, userId }: CreateAddressDto): Promise<User> {
    return this.usersRepo.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      {
        $push: {
          address: {
            name,
            details,
          },
        },
      }
    );
  }
  updateProfile(profile: UpdateUserInput): Promise<User> {
    return this.usersRepo.findOneAndUpdate(
      { _id: new Types.ObjectId(profile.userId)! },
      {
        $set: {
          ...profile,
        },
      }
    );
  }

  async updateRole(
    userId: string,
    admin: User
  ): Promise<typeof UpdateRoleResponse> {
    /**
     * Needs auth from admin. Check if user is admin.
     */

    if (admin.role !== UserRoles.ADMIN) {
      return {
        error: true,
        message: "Only super Admin can update a user's roles",
      };
    }

    await this.usersRepo.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          role: UserRoles.SUBADMIN,
        },
      }
    );
    return {
      success: true,
    };
  }
}
