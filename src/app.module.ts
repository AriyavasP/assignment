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
import { ChapterModule } from './app/chapter/chapter.module';
import { Anime } from './entities/anime.entity';
import { StudioModule } from './app/studio/studio.module';
import { AnimeModule } from './app/anime/anime.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './app.sqlite',
      entities: [User, Studio, Chapter, Anime],
      synchronize: true,
    }),
    ChapterModule,
    StudioModule,
    AnimeModule,
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
