import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Listing } from 'src/listing/listing.entity';
import { Offer } from 'src/offer/offer.entity';
import { DatabaseFile } from 'src/database-file/database-file.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends CommonEntity {
  @Field()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => Listing, (listing) => listing.seller)
  itemsSold: Listing[];

  @Exclude()
  @OneToMany(() => Listing, (listing) => listing.buyer)
  itemsBought: Listing[];

  @OneToMany(() => Offer, (offer) => offer.buyer)
  offers: Offer[];

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => DatabaseFile, { nullable: true })
  avatar?: DatabaseFile;

  @Column({ nullable: true, default: null })
  avatarId?: string;

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
