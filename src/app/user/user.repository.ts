import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './user.interface.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      const data = await this.user.save(user);
      if (data) {
        delete data.password;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const data = await this.user.findOne({
        where: { id: id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const data = await this.user.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const data = await this.user.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
