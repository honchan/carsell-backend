import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileModule } from 'src/database-file/databaseFile.module';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseFileModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
