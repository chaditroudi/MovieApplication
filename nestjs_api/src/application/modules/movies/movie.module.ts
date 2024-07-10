import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from 'src/application/controllers/movie.controller';
import { MovieService } from 'src/application/services/movie.service';
import { MovieSchema } from 'src/domain/entities/movie.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService,],
  exports: [MovieService], 
})
export class MovieModule {}
