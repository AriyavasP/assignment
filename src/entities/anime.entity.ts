import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Studio } from './studio.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  year: number;

  @OneToOne(() => Studio, (studio) => studio.id, { onDelete: 'SET NULL' })
  @JoinColumn()
  studioId: string;
}
