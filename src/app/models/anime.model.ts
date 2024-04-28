import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsUUID } from '../../common/decorators/validateUUID.decoratoer';

export class Animes {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
}

export class AnimesPut {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  studioId: string;
}

export class AnimesDeleted {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
