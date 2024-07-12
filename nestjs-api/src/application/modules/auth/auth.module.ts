import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../../services/auth.service'; 
import { AuthController } from '../../controllers/auth.controller'; 
import { UserModule } from '../user/user.module'; 
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { UserRepository } from '../../../domain/repositories/user.repository';

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

