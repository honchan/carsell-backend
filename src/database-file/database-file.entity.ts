import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Column, Entity } from 'typeorm';

@Entity()
export class DatabaseFile extends CommonEntity {
  @Column()
  filename: string;

  @Column({
    type: 'bytea',
  })
  data: Buffer;
}
