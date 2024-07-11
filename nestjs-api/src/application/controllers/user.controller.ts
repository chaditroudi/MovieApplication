import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/domain/entities/user.schema';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return await this.userService.findOneByUsername(username);
  }
}
