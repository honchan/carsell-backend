import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CommonEntity } from 'src/common/entities/common.entitiy';

@Entity()
export class User extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
