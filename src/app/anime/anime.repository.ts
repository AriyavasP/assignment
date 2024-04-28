import { Injectable } from '@nestjs/common';
import { AnimeRepositoryInterface } from './anime.interface.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from 'src/entities/Anime.entity';
import { Animes, AnimesPut } from '../models/anime.model';

@Injectable()
export class AnimeRepository implements AnimeRepositoryInterface {
  constructor(
    @InjectRepository(Anime)
    private readonly anime: Repository<Anime>,
  ) {}

  async create(AnimeBody: Animes): Promise<Anime> {
    try {
      const data: Anime = await this.anime.save(AnimeBody);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Anime> {
    try {
      const data: Anime = await this.anime.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Anime[]> {
    try {
      const data: Anime[] = await this.anime.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const data = await this.anime.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: string, animeBody: AnimesPut): Promise<Anime> {
    try {
      let data: Anime = await this.findById(id);
      data.studioId = animeBody.studioId;
      return await this.anime.save(data);
    } catch (error) {
      throw error;
    }
  }
}
