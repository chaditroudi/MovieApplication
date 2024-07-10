import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from 'src/application/services/movie.service';
import { MovieRepository } from 'src/domain/repositories/movie.repository';
import { CreateMovieDto } from 'src/application/dtos/create-movie.dto';
import { Movie } from 'src/domain/entities/movie.schema';

type MockType<T> = {
  [P in keyof T]: jest.Mock<Promise<any>>;
};

// Create a mock MovieRepository
const mockMovieRepository = (): MockType<MovieRepository> => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  // close:jest.fn(),
  deleteMany: jest.fn(),
  remove: jest.fn(),
});

describe('MovieService', () => {
  let service: MovieService;
  let repository: MockType<MovieRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const result = [{ title: 'Movie 1' }, { title: 'Movie 2' }] as Movie[];
    repository.findAll.mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should return a specific movie', async () => {
    const movieId = '668e5eaf777356f92589d6a6';
    const result = { title: 'Movie 1' } as Movie;
    repository.findOne.mockResolvedValue(result);

    expect(await service.findOne(movieId)).toBe(result);
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
    const result = { ...createMovieDto, _id: 'new-id' } as Movie;
    repository.create.mockResolvedValue(result);

    expect(await service.create(createMovieDto)).toBe(result);
  });
});
