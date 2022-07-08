import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepo } from './users.repository';
import * as argon2 from 'argon2';
import { UserInputError } from 'apollo-server-express';
import { User } from './entities/user.entity';
import { CreateUserResponse } from './res/createUser.res';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

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
    const user = await this.validateCreateUserRequest(input);
    if (user) {
      return {
        error: true,
        message: 'Email already in use!',
      };
    }

    return this.usersRepo.create({
      ...input,
      password: await argon2.hash(input.password),
    });
  }
  private async validateCreateUserRequest(request: CreateUserInput) {
    let user: User;
    try {
      user = await this.usersRepo.findOne({
        email: request.email,
      });
    } catch (err) {
      return null;
    }

    if (user) {
      return user;
    }
  }
}
