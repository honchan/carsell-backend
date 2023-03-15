import { registerEnumType } from '@nestjs/graphql';

export enum OfferStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}

registerEnumType(OfferStatus, { name: 'OfferStatus' });
