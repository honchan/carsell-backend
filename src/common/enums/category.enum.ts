import { registerEnumType } from '@nestjs/graphql';

export enum Category {
  Services = 'Services',
  // 'Computers & Technology' = 'Computers & Technology',
  // 'Mobile Phones & Gadgets' = 'Mobile Phones & Gadgets',
  // "Women's Fashion" = "Women's Fashion",
  Property = 'Property',
  // "Men's Fashion" = "Men's Fashion",
  Cars = 'Cars',
  // 'Beauty & Personal Care' = 'Beauty & Personal Care',
  Luxury = 'Luxury',
  // 'Free Items' = 'Free Items',
  // 'Video Games' = 'Video Games',
  Photography = 'Photography',
  // 'Furniture & Home Living' = 'Furniture & Home Living',
  // 'Babies & Kids' = 'Babies & Kids',
  Toys = 'Toys',
  // 'Health & Nutrition' = 'Health & Nutrition',
  // 'Sports Equipment' = 'Sports Equipment',
  // 'Food & Drinks' = 'Food & Drinks',
  Motorbikes = 'Motorbikes',
}

registerEnumType(Category, {
  name: 'Category',
  description: 'Category values',
});
