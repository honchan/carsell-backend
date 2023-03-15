import { registerEnumType } from '@nestjs/graphql';

export enum Condition {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  USED = 'USED',
  WELL_USED = 'WELL_USED',
}

registerEnumType(Condition, { name: 'Condition' });
