import { Module } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { AuthController } from 'src/application/controllers/auth.controller';
import { UserModule } from '../user/user.module';

@Module({
      imports: [
            UserModule,
            ConfigModule.forRoot({
              envFilePath: '.env',
              isGlobal: true,
            }),
            JwtModule.register({
                  global: true,
                  secret: process.env.JWT_SECRET ,
                  signOptions: { expiresIn: '1h' },
            }),
      ],
      providers: [AuthService],
      controllers: [AuthController],
      exports: [AuthService],
})
export class AuthModule { }