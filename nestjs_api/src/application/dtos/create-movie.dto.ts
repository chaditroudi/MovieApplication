import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Year should not be empty' })
  year: string;


  @IsOptional()
  @IsString()
  rated: string;


  @IsOptional()
  @IsDateString()
  released?: Date;


  @IsOptional()
  description?:string;

  genre: string;

  _id?: string;

}
