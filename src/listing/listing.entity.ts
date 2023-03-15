import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Category } from 'src/common/enums/category.enum';
import { Condition } from 'src/common/enums/condition.enum';
import { MeetupLocation } from 'src/common/enums/meetup-location.enum';
import { Offer } from 'src/offer/offer.entity';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ListingStatus } from './enums/listing-status.enum';

@Entity()
@ObjectType()
export class Listing extends CommonEntity {
  @Field()
  @Column()
  price?: number;

  @Field(() => Condition)
  @Column({
    type: 'enum',
    enum: Condition,
    default: Condition.NEW,
  })
  condition: Condition;

  @Field(() => ListingStatus)
  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.AVAILABLE,
  })
  status: ListingStatus;

  @Field(() => MeetupLocation)
  @Column({
    type: 'enum',
    enum: MeetupLocation,
    default: null,
    nullable: true,
  })
  location: MeetupLocation;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.itemsSold, { eager: true })
  seller: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.itemsBought, { eager: true })
  buyer: User;

  @Field(() => [Offer], { nullable: true })
  @OneToMany(() => Offer, (offer) => offer.listing)
  offers: Offer[];

  @Field(() => MeetupLocation)
  @Column({
    type: 'enum',
    enum: Category,
    default: null,
  })
  category: Category;

  @Field()
  @Column()
  description: string;

  @Field(() => Review, { nullable: true })
  @OneToOne(() => Review, (review) => review.listing)
  review: Review;
}
