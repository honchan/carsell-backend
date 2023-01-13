import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Listing } from 'src/listing/listing.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => Listing, (listing) => listing.seller)
  itemsSold: Listing[];

  @Exclude()
  @OneToMany(() => Listing, (listing) => listing.buyer)
  itemsBought: Listing[];

  get rating(): number {
    return this.itemsSold.reduce((acc, curr) => {
      if (curr.review) {
        acc += curr.review.rating;
      }
      return acc;
    }, 0);
  }

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
