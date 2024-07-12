import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }
}
