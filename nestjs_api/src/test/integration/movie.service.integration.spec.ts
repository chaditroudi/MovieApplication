import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TestingModule, Test } from "@nestjs/testing";
import { CreateMovieDto } from "src/application/dtos/create-movie.dto";
import { MovieModule } from "src/application/modules/movies/movie.module";
import { MovieService } from "src/application/services/movie.service";
import { Movie, MovieSchema } from "src/domain/entities/movie.schema";
import { MovieRepository } from "src/domain/repositories/movie.repository";


describe('MovieService Integration', () => {
  let service: MovieService;
  let repository: MovieRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        MovieModule,
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<MovieRepository>(MovieRepository);
  });

  // afterEach(async () => {
  //   await repository.deleteMany({});
  // });

  afterAll(async () => {
    await repository.closeConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a movie', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'New Movie',
      description: 'This is a new movie',
      released: new Date('2024-07-10'),
      year: '2021',
      rated: 'Good',
      genre: 'Drama',
    };

    const createdMovie = await service.create(createMovieDto);
    expect(createdMovie).toHaveProperty('_id');
    expect(createdMovie.title).toEqual(createMovieDto.title);
  });

  it('should return an array of movies', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'Movie 1',
      description: 'Description 1',
      released: new Date('2024-07-10'),
      year: '2021',
      rated: 'Good',
      genre: 'Drama',
    };

    await service.create(createMovieDto);
    const movies = await service.findAll();
    expect(movies.length).toBeGreaterThan(0);
  });

  it('should return a specific movie', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'Movie 1',
      description: 'Description 1',
      released: new Date('2024-07-10'),
      year: '2021',
      rated: 'Good',
      genre: 'Drama',
    };

    const createdMovie = await service.create(createMovieDto);
    const foundMovie = await service.findOne(createdMovie._id as string);
    expect(foundMovie).toBeDefined();
    expect(foundMovie.title).toEqual(createMovieDto.title);
  });

  it('should update a movie', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'Movie 1',
      description: 'Description 1',
      released: new Date('2024-07-10'),
      year: '2021',
      rated: 'Good',
      genre: 'Drama',
    };

    const createdMovie = await service.create(createMovieDto);

    const updateMovieDto = { ...createMovieDto, title: 'Updated Movie' };
    const updatedMovie = await service.update(createdMovie._id as string, updateMovieDto);
    expect(updatedMovie.title).toEqual(updateMovieDto.title);
  });

  // it('should delete a movie', async () => {
  //   // Create a movie to delete
  //   const createMovieDto: CreateMovieDto = {
  //     title: 'Movie 1',
  //     description: 'Description 1',
  //     released: new Date('2024-07-10'),
  //     year: '2021',
  //     rated: 'Good',
  //     genre: 'Drama',
  //   };
  
  //   const createdMovie = await service.create(createMovieDto);
  
  //   const result = await service.remove(createdMovie._id as string);
  //   expect(result).toBeDefined(); // Check that the remove operation was successful
  
  //   // Check if the movie was actually deleted
  //   const foundMovie = await service.findOne(createdMovie._id as string);
  //   expect(foundMovie).toBeNull(); // Expect the movie to not be found after deletion
  // });

})
  