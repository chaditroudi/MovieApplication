import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }
}
