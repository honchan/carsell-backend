import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFile } from './databaseFile.entity';
import { DatabaseFileService } from './databaseFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  providers: [DatabaseFileService],
  exports: [DatabaseFileService],
})
export class DatabaseFileModule {}
