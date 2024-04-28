import { Chapter } from 'src/entities/chapter.entity';
import { Chapters, ChaptersPut } from '../models/chapter.model';

export interface ChapterRepositoryInterface {
  create(chapter: Chapters): Promise<Chapter>;
  findById(id: string): Promise<Chapter>;
  findAll(): Promise<Chapter[]>;
  deleteById(id: string): Promise<Chapter>;
  updateById(id: string, chapterBody: ChaptersPut): Promise<Chapter>;
}
