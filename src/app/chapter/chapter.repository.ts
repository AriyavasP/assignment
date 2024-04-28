import { Injectable } from '@nestjs/common';
import { ChapterRepositoryInterface } from './chapter.interface.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from 'src/entities/chapter.entity';
import { Chapters, ChaptersPut } from '../models/chapter.model';

@Injectable()
export class ChapterRepository implements ChapterRepositoryInterface {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapter: Repository<Chapter>,
  ) {}

  async create(chapterBody: Chapters): Promise<Chapter> {
    try {
      const data: Chapter = this.chapter.create({
        name: chapterBody.name,
        duration: chapterBody.duration,
      });
      let chaperRes = await this.chapter.save(data);
      data.animeId = chaperRes.animeId;
      data.studioId = chaperRes.studioId;
      chaperRes = await this.chapter.save(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Chapter> {
    try {
      const data: Chapter = await this.chapter.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Chapter[]> {
    try {
      const data: Chapter[] = await this.chapter.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const data = await this.chapter.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: string, chapterBody: ChaptersPut): Promise<Chapter> {
    try {
      let data: Chapter = await this.findById(id);
      data.studioId = chapterBody.studioId;
      data.animeId = chapterBody.animeId;
      return await this.chapter.save(data);
    } catch (error) {
      throw error;
    }
  }
}
