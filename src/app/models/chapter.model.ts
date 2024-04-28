import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class Chapters {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

export class ChaptersPut {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  studioId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  animeId: string;
}

export class ChaptersDeleted {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
