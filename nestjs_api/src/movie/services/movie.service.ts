import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../schemas/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createMovie = new this.movieModel(createMovieDto);
    return createMovie.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie  with #${id} not found`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const existingMovie = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true }).exec();
    if (!existingMovie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return existingMovie;
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.movieModel.findByIdAndDelete(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return movie;
  }
}
