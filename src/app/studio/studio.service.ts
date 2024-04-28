import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { StudioRepositoryInterface } from './studio.interface.repository';
import { Studios } from '../models/studio.model';

@Injectable()
export class StudioService {
  constructor(
    @Inject('StudioRepositoryInterface')
    private readonly studioRepository: StudioRepositoryInterface,
  ) {}
  data = {
    status: HttpStatus.OK,
    res: [] || '' || {},
  };

  async createStudio(studio: Studios) {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.studioRepository.create(studio);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudioById(id: string) {
    try {
      this.data.status = HttpStatus.OK;
      this.data.res = await this.studioRepository.findById(id);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudio() {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.studioRepository.findAll();
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudio(id: string) {
    try {
      const Studio = await this.studioRepository.findById(id);
      if (!Studio) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.studioRepository.deleteById(id);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async updatehapter(id: string, StudioBody: Studios) {
    try {
      const Studio = await this.studioRepository.findById(id);
      if (!Studio) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.studioRepository.updateById(id, StudioBody);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }
}
