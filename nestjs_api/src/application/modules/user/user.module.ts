import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../domain/entities/user.schema';
import { UserService } from 'src/application/services/user.service';
import { UserController } from 'src/application/controllers/user.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],

  controllers: [UserController],
})
export class UserModule {}
