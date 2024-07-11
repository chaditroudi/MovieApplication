// src/common/filters/validation-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const errors = exception.constraints;

        const messages = [];
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                messages.push(errors[key]);
            }
        }

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
