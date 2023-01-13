import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { CreateListingInput } from './inputs/create-listing.input';
import { ListingService } from './listing.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  public async listings() {
    return await this.listingService.listings();
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  public async ownListings(@Req() request: RequestWithUser) {
    return await this.listingService.listingsBySeller(request.user.id);
  }

  @Get(':id')
  public async listingsBySeller(@Param('id') id: string) {
    return await this.listingService.listingsBySeller(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createListing(
    @Req() request: RequestWithUser,
    @Body() input: CreateListingInput,
  ) {
    return await this.listingService.createListing(input, request.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateListing(
    @Param('id') id: string,
    @Body() input: CreateListingInput,
    @Req() request: RequestWithUser,
  ) {
    return await this.listingService.updateListing(id, input, request.user.id);
  }
}
