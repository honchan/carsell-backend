import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { CreateListingInput } from './inputs/create-listing.input';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  public async listings() {
    return await this.listingService.listings();
  }

  @Get('self')
  public async listingsBySeller(@Req() request: RequestWithUser) {
    return await this.listingService.listingsBySeller(request.user.id);
  }

  @Post()
  public async createListing(
    @Req() request: RequestWithUser,
    @Body() input: CreateListingInput,
  ) {
    return await this.listingService.createListing(input, request.user);
  }
}
