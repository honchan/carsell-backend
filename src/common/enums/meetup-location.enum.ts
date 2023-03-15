import { registerEnumType } from '@nestjs/graphql';

export enum MeetupLocation {
  ISLAND = 'ISLAND',
  KOWLOON = 'KOWLOON',
  NEW_TERRITORIES = 'NEW_TERRITORIES',
}

registerEnumType(MeetupLocation, { name: 'MeetupLocation' });
