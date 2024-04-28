import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Users } from '../models/user.model';
import { UserRepositoryInterface } from './user.interface.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  data = {
    status: HttpStatus.OK,
    res: [] || '' || {},
  };

  async createUser(user: Users) {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.userRepository.create(user);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      this.data.status = HttpStatus.OK;
      this.data.res = await this.userRepository.findById(id);
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      this.data.status = HttpStatus.CREATED;
      this.data.res = await this.userRepository.findAll();
      return this.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        this.data.status = HttpStatus.NOT_FOUND;
        this.data.res = `can't found data.`;
        return this.data;
      }
      this.data.status = HttpStatus.NO_CONTENT;
      await this.userRepository.deleteById(id);
      this.data.res = 'Successful.';
      return this.data;
    } catch (error) {
      throw error;
    }
  }
}
