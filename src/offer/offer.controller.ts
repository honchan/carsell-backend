import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { CreateOfferInput } from './inputs/create-offer.input';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  public async offersByListing(@Query('listing') listing: string) {
    return this.offerService.offersByListing(listing);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createOffer(
    @Req() request: RequestWithUser,
    @Body() input: CreateOfferInput,
  ): Promise<Offer> {
    return this.offerService.createOffer({ ...input, buyer: request.user });
  }

  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  public async cancelOffer(
    @Req() request: RequestWithUser,
    @Body('id') id: string,
  ): Promise<boolean> {
    return this.offerService.cancelOffer(request.user, id);
  }

  @Post('accept')
  @UseGuards(JwtAuthGuard)
  public async acceptOffer(
    @Req() request: RequestWithUser,
    @Body('id') id: string,
  ) {
    this.offerService.acceptOffer(request.user, id);
  }
}
