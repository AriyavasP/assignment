import { Injectable } from '@nestjs/common';
import { StudioRepositoryInterface } from './studio.interface.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from 'src/entities/Studio.entity';
import { Studios } from '../models/studio.model';

@Injectable()
export class StudioRepository implements StudioRepositoryInterface {
  constructor(
    @InjectRepository(Studio)
    private readonly studio: Repository<Studio>,
  ) {}

  async create(studioBody: Studios): Promise<Studio> {
    try {
      const data: Studio = await this.studio.save(studioBody);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Studio> {
    try {
      const data: Studio = await this.studio.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Studio[]> {
    try {
      const data: Studio[] = await this.studio.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const data = await this.studio.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: string, StudioBody: Studios): Promise<Studio> {
    try {
      let data: Studio = await this.findById(id);
      data.name = StudioBody.name;
      data.website = StudioBody.website;
      return await this.studio.save(data);
    } catch (error) {
      throw error;
    }
  }
}
