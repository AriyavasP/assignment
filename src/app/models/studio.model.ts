import { IsNotEmpty, IsString } from 'class-validator';
import { IsUUID } from '../../common/decorators/validateUUID.decoratoer';

export class Studios {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  website: string;
}

export class StudioDeleted {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
