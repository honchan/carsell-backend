import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateListingInput } from './inputs/create-listing.input';
import { UpdateListingInput } from './inputs/update-listing.input';
import { Listing } from './listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly userService: UserService,
  ) {}

  public listings(): Promise<Listing[]> {
    return this.listingRepository.find();
  }

  public findById(id: string): Promise<Listing> {
    return this.listingRepository.findOne({ where: { id } });
  }

  public async listingsBySeller(sellerId: string): Promise<Listing[]> {
    const seller = await this.userService.getById(sellerId);
    const result = await this.listingRepository.find({ where: { seller } });
    return result;
  }

  public async createListing(
    input: CreateListingInput,
    seller: User,
  ): Promise<Listing> {
    const listing = await this.listingRepository.create({
      ...input,
      seller,
    });

    return await this.listingRepository.save(listing);
  }

  public async updateListing(
    listingId: string,
    input: UpdateListingInput,
    sellerId: string,
  ): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id: listingId, seller: { id: sellerId } },
    });
    const updatedListing = await this.listingRepository.merge(listing, input);

    return await this.listingRepository.save(updatedListing);
  }
}
