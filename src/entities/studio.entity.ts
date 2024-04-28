import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  website: string;
}
