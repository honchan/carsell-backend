import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ListingController } from './listing.controller';
import { Listing } from './listing.entity';
import { ListingResolver } from './listing.resolver';
import { ListingService } from './listing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), UserModule],
  providers: [ListingService, ListingResolver],
  controllers: [ListingController],
  exports: [ListingService],
})
export class ListingModule {}
