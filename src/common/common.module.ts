import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

@Module({
  imports: [],
  providers: [CommonService],
  controllers: [CommonController],
  exports: [CommonService],
})
export default class CommonModule {}
