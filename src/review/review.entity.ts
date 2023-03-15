import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Review extends CommonEntity {
  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Listing)
  @OneToOne(() => Listing, (listing) => listing.review)
  listing: Listing;
}
