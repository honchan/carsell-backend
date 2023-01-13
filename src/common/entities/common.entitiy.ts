import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Exclude()
  @CreateDateColumn()
  createDate?: Date;

  @Exclude()
  @UpdateDateColumn()
  updateDate?: Date;

  @Exclude()
  @VersionColumn()
  version?: number;
}
