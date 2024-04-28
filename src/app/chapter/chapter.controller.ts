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
import { ResponseUtils } from 'src/common/response.service';
import {
  Chapters,
  ChaptersDeleted,
  ChaptersPut,
} from '../models/chapter.model';
import { ChapterService } from './chapter.service';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') param: string) {
    try {
      const { status, res } = await this.chapterService.getChapterById(param);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Get()
  @HttpCode(200)
  async getUser() {
    try {
      const { status, res } = await this.chapterService.getChapter();
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: Chapters) {
    try {
      const { status, res } = await this.chapterService.createChapter(body);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() id: ChaptersDeleted) {
    try {
      const { status, res } = await this.chapterService.deleteChapter(id.id);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param() id: ChaptersDeleted, @Body() body: ChaptersPut) {
    try {
      const { status, res } = await this.chapterService.updatehapter(
        id.id,
        body,
      );
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
