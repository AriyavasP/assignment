import { Anime } from 'src/entities/Anime.entity';
import { Animes, AnimesPut } from '../models/anime.model';

export interface AnimeRepositoryInterface {
  create(chapter: Animes): Promise<Anime>;
  findById(id: string): Promise<Anime>;
  findAll(): Promise<Anime[]>;
  deleteById(id: string): Promise<Anime>;
  updateById(id: string, chapterBody: AnimesPut): Promise<Anime>;
}
