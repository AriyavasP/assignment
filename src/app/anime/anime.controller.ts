import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { ResponseUtils } from 'src/common/response.service';
import { Animes, AnimesDeleted, AnimesPut } from '../models/anime.model';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get(':id')
  @HttpCode(200)
  async getAnimeById(@Param('id') param: string) {
    try {
      const { status, res } = await this.animeService.getanimeById(param);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Get()
  @HttpCode(200)
  async getAnime() {
    try {
      const { status, res } = await this.animeService.getanime();
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Post()
  @HttpCode(201)
  async createAnime(@Body() body: Animes) {
    try {
      const { status, res } = await this.animeService.createanime(body);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAnime(@Param() id: AnimesDeleted) {
    try {
      const { status, res } = await this.animeService.deleteanime(id.id);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Put(':id')
  @HttpCode(204)
  async updateAnime(@Param() id: AnimesDeleted, @Body() body: AnimesPut) {
    try {
      const { status, res } = await this.animeService.updatehapter(id.id, body);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
