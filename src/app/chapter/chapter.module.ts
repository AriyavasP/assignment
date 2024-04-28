import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterRepository } from './chapter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from 'src/entities/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  controllers: [ChapterController],
  providers: [
    ChapterService,
    {
      provide: 'ChapterRepositoryInterface',
      useClass: ChapterRepository,
    },
  ],
})
export class ChapterModule {}
