import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './midleware/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './midleware/http-exception.filter';
import { TransformResponseInterceptor } from './midleware/tranformResponse.interceptor';
import { UserModule } from './app//user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ValidatePipe } from './common/validate.pipe';
import { Chapter } from './entities/chapter.entity';
import { Studio } from './entities/studio.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [User, Studio, Chapter],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidatePipe(),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
