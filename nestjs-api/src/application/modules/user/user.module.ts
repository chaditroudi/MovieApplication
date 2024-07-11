import { UserService } from 'src/application/services/user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../domain/entities/user.schema';
import { UserController } from 'src/application/controllers/user.controller';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService,UserRepository,JwtService],
  exports: [UserService, MongooseModule],

  controllers: [UserController],
})
export class UserModule {}
