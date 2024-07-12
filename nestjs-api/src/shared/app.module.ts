import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger-middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../application/modules/auth/auth.module';
import { MovieModule } from '../application/modules/movies/movie.module';
import { UserModule } from '../application/modules/user/user.module';
import { AuthMiddleware } from '../common/middleware/auth.middlewar';
import { AuthGuard } from '../common/guards/AuthGuard';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
      MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
      global: true, 
    }),
    AuthModule,
    UserModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
    )
    .forRoutes('*');

    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
  
}