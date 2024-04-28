import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ChapterRepositoryInterface } from './chapter.interface.repository';
import { Chapters, ChaptersPut } from '../models/chapter.model';

@Injectable()
export class ChapterService {
  constructor(
    @Inject('ChapterRepositoryInterface')
    private readonly chapterRepository: ChapterRepositoryInterface,
  ) {}
  data = {
    status: HttpStatus.OK,
    res: [] || '' || {},
  };

  async createChapter(chapter: Chapters) {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.chapterRepository.create(chapter);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getChapterById(id: string) {
    try {
      this.data.status = HttpStatus.OK;
      this.data.res = await this.chapterRepository.findById(id);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getChapter() {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.chapterRepository.findAll();
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteChapter(id: string) {
    try {
      const Chapter = await this.chapterRepository.findById(id);
      if (!Chapter) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.chapterRepository.deleteById(id);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async updatehapter(id: string, chapterBody: ChaptersPut) {
    try {
      const Chapter = await this.chapterRepository.findById(id);
      if (!Chapter) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.chapterRepository.updateById(id, chapterBody);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }
}
