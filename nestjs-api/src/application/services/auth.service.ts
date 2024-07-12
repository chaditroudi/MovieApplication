import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user.schema';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<{ message: string, access_token: string }> {
    const user = await this.authRepository.findOneByUsername(loginDto.username);

    if (user) {
      const passwordMatch = await bcrypt.compare(loginDto.password, user.password);

      if (passwordMatch) {
        const payload = this._createJwtPayload(user);
        return {
          message: 'Login successful',
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  private _createJwtPayload(user: User): { sub: string, username: string } {
    return { sub: user.id, username: user.username }; // Adjust as per your User schema
  }

  async validateUserById(userId: string): Promise<User> {
    return await this.userRepository.findById(userId);
  }
}
