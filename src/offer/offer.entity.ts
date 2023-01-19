import { CommonEntity } from 'src/common/entities/common.entitiy';
import { Listing } from 'src/listing/listing.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OfferStatus } from './enums/offer-status.enum';

@Entity()
export class Offer extends CommonEntity {
  @Column()
  price?: number;

  @ManyToOne(() => Listing, (listing) => listing.offers, { eager: true })
  listing: Listing;

  @ManyToOne(() => User, (user) => user.offers, { eager: true })
  buyer: User;

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.PENDING,
  })
  status: OfferStatus;
}
