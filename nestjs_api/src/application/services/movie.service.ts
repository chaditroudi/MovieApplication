import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOne(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string): Promise<Movie> {
    return this.movieRepository.remove(id);
  }
}
