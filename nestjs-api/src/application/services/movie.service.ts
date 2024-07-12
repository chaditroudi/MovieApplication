import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from '../../domain/entities/movie.schema';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { MovieRepository } from '../../domain/repositories/movie.repository';

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

  async remove(id: string): Promise<string> {
    return this.movieRepository.remove(id);
  }
}
