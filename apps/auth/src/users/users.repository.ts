import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'libs/database/abstract.repository';

import { Connection, Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepo extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepo.name);
  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection);
  }
}
