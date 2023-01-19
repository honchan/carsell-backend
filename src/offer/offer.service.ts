import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingService } from 'src/listing/listing.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { OfferStatus } from './enums/offer-status.enum';
import { CreateOfferInput } from './inputs/create-offer.input';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly listingService: ListingService,
  ) {}

  public async offersByListing(listingId: string): Promise<Offer[]> {
    const listing = await this.listingService.findById(listingId);
    return this.offerRepository.find({ where: { listing } });
  }

  public async createOffer(input: CreateOfferInput): Promise<Offer> {
    const listing = await this.listingService.findById(input.listingId);
    const sameSellerAndBuyer = listing.seller.id === input.buyer.id;

    if (sameSellerAndBuyer) {
      throw new BadRequestException(
        'You cannot make an offer on your own listing',
      );
    }

    const offer = await this.offerRepository.create({
      buyer: input.buyer,
      price: input.price,
      listing,
    });

    return await this.offerRepository.save(offer);
  }

  public async acceptOffer(seller: User, offerId: string): Promise<boolean> {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
    });

    if (!offer) {
      throw new BadRequestException('Invalid offer');
    }

    const validSeller = offer.listing.seller.id === seller.id;
    const offerAccepted = offer.status === OfferStatus.ACCEPTED;

    if (!validSeller || offerAccepted) {
      return false;
    }

    await this.offerRepository.update(offerId, {
      status: OfferStatus.ACCEPTED,
    });

    return true;
  }

  public async cancelOffer(buyer: User, offerId: string): Promise<boolean> {
    const offer = await this.offerRepository.findOne({
      where: {
        buyer,
        id: offerId,
      },
    });

    if (offer) {
      await this.offerRepository.update(offerId, {
        status: OfferStatus.CANCELLED,
      });
      return true;
    }

    return false;
  }
}
