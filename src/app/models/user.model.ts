import { IsNotEmpty, IsString } from 'class-validator';
import { IsUUID } from '../../common/decorators/validateUUID.decoratoer';

export class Users {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserDeleted {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
