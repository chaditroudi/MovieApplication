
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({
          message: 'Unauthorized',
          error: 'JWT expired',
          statusCode: 401,
        });
      } else {
        console.log(error)
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
