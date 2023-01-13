import { Category } from 'src/common/enums/category.enum';
import { MeetupLocation } from 'src/common/enums/meetup-location.enum';
import { Condition } from '../../common/enums/condition.enum';

export class UpdateListingInput {
  price: number;

  condition: Condition;

  location: MeetupLocation;

  category: Category;

  description: string;
}
