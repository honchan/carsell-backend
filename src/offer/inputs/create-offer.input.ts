import { User } from 'src/user/user.entity';

export class CreateOfferInput {
  buyer: User;

  price: number;

  listingId: string;
}
