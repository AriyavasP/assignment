import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: false })
  studioID: string | null;

  @Column({ length: 255, nullable: false })
  animeId: string | null;

  @Column()
  duration: number;

  @Column({ length: 255, select: false })
  password: string;
}
