import { Studio } from 'src/entities/studio.entity';
import { Studios } from '../models/studio.model';

export interface StudioRepositoryInterface {
  create(chapter: Studios): Promise<Studio>;
  findById(id: string): Promise<Studio>;
  findAll(): Promise<Studios[]>;
  deleteById(id: string): Promise<Studio>;
  updateById(id: string, chapterBody: Studios): Promise<Studio>;
}
