import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from '../src/application/modules/movies/movie.module';

export const database = process.env.MONGO_URI;

export const imports = [
    MongooseModule.forRoot(database),
     MovieModule,
];