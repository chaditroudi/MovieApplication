// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../application/dtos/login.dto';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { Public } from 'src/common/directors/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully',
        user: newUser,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.CONFLICT,
        message: error.message,
      };
    }
  }
}
    