import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ResponseUtils } from 'src/common/response.service';
import { HttpStatus } from '@nestjs/common';
import { UserDeleted, Users } from '../models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') param: string) {
    try {
      const { status, res } = await this.userService.getUserById(param);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Get()
  @HttpCode(200)
  async getUser() {
    try {
      const { status, res } = await this.userService.getUser();
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: Users) {
    try {
      const { status, res } = await this.userService.createUser(body);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() id: UserDeleted) {
    try {
      const { status, res } = await this.userService.deleteUser(id.id);
      return ResponseUtils.Reponse(res, status);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }
}
