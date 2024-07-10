import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { AuthController } from '../../controllers/auth.controller'; // Adjust path as needed
import { UserModule } from '../user/user.module'; // Adjust path as needed
import { AuthRepository } from 'src/domain/repositories/auth.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.schema';

  @Module({
    imports: [
      UserModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('JWT_SECRET'),
          };
        },
        inject: [ConfigService],
      }),
    ],
  
  providers: [AuthService, AuthRepository, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

