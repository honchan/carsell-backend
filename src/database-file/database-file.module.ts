import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileController } from './database-file.controller';
import { DatabaseFile } from './database-file.entity';
import { DatabaseFileService } from './database-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  providers: [DatabaseFileService],
  controllers: [DatabaseFileController],
  exports: [DatabaseFileService],
})
export class DatabaseFileModule {}
