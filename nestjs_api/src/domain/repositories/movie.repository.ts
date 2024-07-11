
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { CreateMovieDto } from 'src/application/dtos/create-movie.dto';
import { Movie } from '../entities/movie.schema';
import { UpdateMovieDto } from 'src/application/dtos/update-movie.dto';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectConnection() private connection: Connection,
  ) {}

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
      throw new NotFoundException(`Movie with #${id} not found`);
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

  async remove(id: string): Promise<string> {
    const movie = await this.movieModel.findByIdAndDelete(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
      return `Movie #${id} has been successfully deleted`;

  }

  async deleteMany(conditions: any): Promise<any> {
    return this.movieModel.deleteMany(conditions).exec();
  }

  async closeConnection(): Promise<void> {
    await this.connection.close();
  }
  // async onModuleDestroy() {
  //   await this.movieModel.connection.close();
  // }
}
