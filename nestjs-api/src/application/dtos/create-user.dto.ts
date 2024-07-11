import { IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Username should not be empty' })

    readonly username: string;
      @IsNotEmpty({ message: 'Password should not be empty' })

    readonly password: string;
  }