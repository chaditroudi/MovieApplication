import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.userService.create(createUserDto);

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.username);

    if (user) {
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (passwordMatch) {
        const payload = this._createJwtPayload(user);
        return {
            message :'Login successful',
            access_token: await this.jwtService.signAsync(payload),
        };
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  private _createJwtPayload(user: User) {
    return {sub: user, username: user.username }; 
  }

  async validateUserById(userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }
}
