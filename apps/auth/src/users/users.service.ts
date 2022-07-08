import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepo } from './users.repository';
import * as argon2 from 'argon2';
import { UserInputError } from 'apollo-server-express';
import { User } from './entities/user.entity';
import { CreateUserResponse } from './res/createUser.res';
import { lastValueFrom } from 'rxjs';
import { EMAIL_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { authenticate } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepo,
    @Inject(EMAIL_SERVICE) private readonly emailClient: ClientProxy
  ) {}

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.usersRepo.findOne({ email });
    } catch (error) {
      throw new UserInputError('Email not found');
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

    await this.createUserEvent({ email: newUser.email });

    return newUser;
  }

  async createUserEvent(user: Partial<User>) {
    await lastValueFrom(
      this.emailClient.emit('user_verifyEmail', JSON.stringify({ data: user }))
    );
  }
}
