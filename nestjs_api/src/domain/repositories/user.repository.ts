import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { User } from 'src/domain/entities/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }
}
