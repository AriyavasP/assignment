import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AnimeRepositoryInterface } from './anime.interface.repository';
import { Animes, AnimesPut } from '../models/anime.model';

@Injectable()
export class AnimeService {
  constructor(
    @Inject('AnimeRepositoryInterface')
    private readonly animeRepository: AnimeRepositoryInterface,
  ) {}
  data = {
    status: HttpStatus.OK,
    res: [] || '' || {},
  };

  async createanime(anime: Animes) {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.animeRepository.create(anime);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getanimeById(id: string) {
    try {
      this.data.status = HttpStatus.OK;
      this.data.res = await this.animeRepository.findById(id);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getanime() {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.animeRepository.findAll();
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteanime(id: string) {
    try {
      const anime = await this.animeRepository.findById(id);
      if (!anime) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.animeRepository.deleteById(id);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async updatehapter(id: string, animeBody: AnimesPut) {
    try {
      const anime = await this.animeRepository.findById(id);
      if (!anime) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.animeRepository.updateById(id, animeBody);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }
}
