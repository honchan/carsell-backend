import { registerEnumType } from '@nestjs/graphql';

export enum ListingStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  CANCELLED = 'CANCELLED',
}

registerEnumType(ListingStatus, { name: 'ListingStatus' });
