import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [UserModule],
  providers: [ListingService],
  controllers: [ListingController],
  exports: [],
})
export class ListingModule {}
