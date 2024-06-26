import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Studio } from './studio.entity';
import { Anime } from './anime.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @OneToOne(() => Studio, (studio) => studio.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  studioId: string;

  @ManyToOne(() => Anime, (anime) => anime.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  animeId: string;

  @Column()
  duration: number;
}
