import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../../entities/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return await this.userService.findOne(username);
  }
}
