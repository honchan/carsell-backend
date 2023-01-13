import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class Review extends CommonEntity {
  @Column()
  rating: number;

  @Column()
  description: string;

  @OneToOne(() => Listing, (listing) => listing.review)
  listing: Listing;
}
