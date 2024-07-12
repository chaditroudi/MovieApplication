import mongoose from 'mongoose';
import { database } from '../constant';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/application/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/shared/app.module';
import { MovieModule } from '../../src/application/modules/movies/movie.module';
import { CreateMovieDto } from 'src/application/dtos/create-movie.dto';
import supertest, * as request from 'supertest';
import path from 'path';

import * as fs from 'fs';


const logFile= path.join(__dirname, 'e2e-test.log');
describe('Movie Controller (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;

  beforeAll(async () => {
    const moduleFixt: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MovieModule],
    }).compile();

    app = moduleFixt.createNestApplication();
    await app.init();

    authService = moduleFixt.get<AuthService>(AuthService);

    token = (
      await authService.login({ username: 'amine', password: 'chadi1A&' })
    ).access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies create (POST)', () => {
    const createMoviDto: CreateMovieDto = {
      title: 'New Movie',
      description: 'This is a new movie',
      released: new Date('2024-07-10'),
      year: '2021',
      rated: 'Good',
      genre: 'Actions',
    };
    return supertest(app.getHttpServer())
      .post('/movies')
      .set('Authorization', `Bearer ${token}`)
      .send(createMoviDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toEqual(createMoviDto.title);
      });
  });


  it('/movies findAll (GET)', () => {
    return supertest(app.getHttpServer())
      .get('/movies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThan(0);

        // save data in file :
        fs.appendFileSync(logFile,JSON.stringify(response.body,null,2) + '\n');
      });
  });


it('/movies/:id (GET)', async () => {
  const createMovieDto: CreateMovieDto = {
    title: 'chadii movie',
    description: 'This is a new movie',
    released: new Date('2024-07-10'),
    year: '2021',
    rated: 'Very good',
    genre: 'Comic',
  };


  const createdMovie = await supertest(app.getHttpServer())
    .post('/movies')
    .set('Authorization', `Bearer ${token}`)
    .send(createMovieDto)
    .expect(201);

  return supertest(app.getHttpServer())
    .get(`/movies/${createdMovie.body._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(createMovieDto.title);

      fs.appendFileSync(logFile,JSON.stringify(response.body,null,2) + '\n');
    });
});

it('PATCH /movies/:id should update a movie', async () => {

  const createMovieDto: CreateMovieDto = {
    title: 'Sample Movie', 
    description: 'Initial description',
    released: new Date('2024-07-10'),
    year: '2021',
    rated: 'Very good',
    genre: 'dsqdC',
  };

  const createResponse = await supertest(app.getHttpServer())
    .post('/movies')
    .set('Authorization', `Bearer ${token}`)
    .send(createMovieDto)
    .expect(HttpStatus.CREATED);

  const movieId = createResponse.body._id;

  // Now, update the movie
  const updatedMovieData = {
    description: 'Updated description',
  };

  const response = await supertest(app.getHttpServer())
    .patch(`/movies/${movieId}`) 
    .set('Authorization', `Bearer ${token}`)
    .send(updatedMovieData)
    .expect(HttpStatus.OK);

  expect(response.body).toHaveProperty('_id', movieId); 
  expect(response.body).toHaveProperty('title', 'Sample Movie'); 
  expect(response.body).toHaveProperty('description', 'Updated description');
});


it("DELETE /movies/:id should delete a movie",async() => {
  const createMovieDto: CreateMovieDto = {
    title: 'Sample Moviesdqdsqd',
    description: 'Initial descriptiondsqd',
    released: new Date('2024-07-10'),
    year: '2021',
    rated: 'Very good',
    genre: 'dsqdC',
  };


  const createResponse = await supertest(app.getHttpServer())
  .post('/movies')
  .set('Authorization', `Bearer ${token}`)
  .send(createMovieDto)
  .expect(HttpStatus.CREATED);

const movieId = createResponse.body._id;




  const deleteResp = await supertest(app.getHttpServer())
  .delete(`/movies/${movieId}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(HttpStatus.OK);

  expect(deleteResp.body).toHaveProperty('message',deleteResp.body.message);


  const getResponse = await supertest(app.getHttpServer())
  .get(`/movies/${movieId}`)
  .set('Authorization', `Bearer ${token}`)
  expect(getResponse.body).toHaveProperty('message',getResponse.body.message);


})

});
