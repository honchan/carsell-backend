import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Category } from 'src/common/enums/category.enum';
import { Condition } from 'src/common/enums/condition.enum';
import { MeetupLocation } from 'src/common/enums/meetup-location.enum';
import { Review } from 'src/review/review.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { ListingStatus } from './enums/listing-status.enum';

@Entity()
export class Listing extends CommonEntity {
  @Column()
  price?: number;

  @Column({
    type: 'enum',
    enum: Condition,
    default: Condition.NEW,
  })
  condition: Condition;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.AVAILABLE,
  })
  status: ListingStatus;

  @Column({
    type: 'enum',
    enum: MeetupLocation,
    default: null,
    nullable: true,
  })
  location: MeetupLocation;

  @ManyToOne(() => User, (user) => user.itemsSold, { eager: true })
  seller: User;

  @ManyToOne(() => User, (user) => user.itemsBought, { eager: true })
  buyer: User;

  @Column({
    type: 'enum',
    enum: Category,
    default: null,
  })
  category: Category;

  @Column()
  description: string;

  @OneToOne(() => Review, (review) => review.listing)
  review: Review;
}
