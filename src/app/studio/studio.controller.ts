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
import { StudioService } from './studio.service';
import { ResponseUtils } from 'src/common/response.service';
import { StudioDeleted, Studios } from '../models/studio.model';

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Get(':id')
  @HttpCode(200)
  async getStudioById(@Param('id') param: string) {
    try {
      const { status, res } = await this.studioService.getStudioById(param);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Get()
  @HttpCode(200)
  async getStudio() {
    try {
      const { status, res } = await this.studioService.getStudio();
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Post()
  @HttpCode(201)
  async createStudio(@Body() body: Studios) {
    try {
      const { status, res } = await this.studioService.createStudio(body);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteStudio(@Param() id: StudioDeleted) {
    try {
      const { status, res } = await this.studioService.deleteStudio(id.id);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Put(':id')
  @HttpCode(204)
  async updateStudio(@Param() id: StudioDeleted, @Body() body: Studios) {
    try {
      const { status, res } = await this.studioService.updatehapter(
        id.id,
        body,
      );
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
