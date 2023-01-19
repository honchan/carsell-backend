import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingModule } from 'src/listing/listing.module';
import { OfferController } from './offer.controller';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), ListingModule],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
