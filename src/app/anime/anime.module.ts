import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Anime } from 'src/entities/anime.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeRepository } from './anime.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimeController],
  providers: [
    AnimeService,
    {
      provide: 'AnimeRepositoryInterface',
      useClass: AnimeRepository,
    },
  ],
})
export class AnimeModule {}
