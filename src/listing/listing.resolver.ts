import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Listing } from './listing.entity';
import { ListingService } from './listing.service';

@Resolver()
export class ListingResolver {
  constructor(private readonly listingService: ListingService) {}

  @Query(() => [Listing])
  async listings(): Promise<Listing[]> {
    const res = await this.listingService.listings();
    console.log(JSON.stringify(res, null, 2));

    return res;
  }

  @Query(() => Listing)
  async listing(@Args('id') id: string): Promise<Listing> {
    return await this.listingService.findById(id);
  }
}
