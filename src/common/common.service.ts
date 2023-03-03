import { Injectable } from '@nestjs/common';
import { Category } from './enums/category.enum';

@Injectable()
export class CommonService {
  getAllCategories(): string[] {
    return Object.keys(Category);
  }
}
