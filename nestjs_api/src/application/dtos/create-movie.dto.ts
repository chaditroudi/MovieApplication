import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
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
