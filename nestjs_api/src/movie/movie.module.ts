import { Module } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
