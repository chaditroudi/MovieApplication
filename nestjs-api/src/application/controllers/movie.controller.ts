import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';

import { AuthGuard } from '../../common/guards/AuthGuard';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    try {
      return this.movieService.create(createMovieDto);
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const successMessage = await this.movieService.remove(id);
    return { message: successMessage };
    
  }
}
