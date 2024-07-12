import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from '../../../application/controllers/movie.controller';
import { MovieService } from '../../../application/services/movie.service';
import { Movie, MovieSchema } from '../../../domain/entities/movie.schema';
import { MovieRepository } from '../../../domain/repositories/movie.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService,MovieRepository,JwtService],
  exports: [MovieService,MovieRepository,MongooseModule], 
})
export class MovieModule {}
