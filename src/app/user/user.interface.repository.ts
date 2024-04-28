import { Users } from '../models/user.model';
import { User } from 'src/entities/user.entity';

export interface UserRepositoryInterface {
  create(user: Users): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  deleteById(id: string): Promise<any>;
}
