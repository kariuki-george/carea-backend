import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserResponse } from './res/createUser.res';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Mutation(() => CreateUserResponse)
  async createUser(
    @Args('createUser') createUser: CreateUserInput
  ): Promise<typeof CreateUserResponse> {
    return this.usersService.createUser(createUser);
  }
}
