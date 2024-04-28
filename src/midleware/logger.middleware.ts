import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    const startTime = Date.now();

    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        request.body = method !== 'GET' ? JSON.parse(body) : {};
      } catch (error) {
        request.body = {};
      }
    });

    const queryParams = JSON.stringify(request.query);

    const urlParams = JSON.stringify(request.params);

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const duration = Date.now() - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${duration}ms - Body: ${JSON.stringify(
          request.body,
        )} - Query Params: ${queryParams} - URL Params: ${urlParams}`,
      );
    });

    response.on('close', () => {
      const duration = Date.now() - startTime;
      this.logger.log(
        `${method} ${originalUrl} - Closed - ${userAgent} ${ip} - ${duration}ms`,
      );
    });

    next();
  }
}