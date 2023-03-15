import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseFile } from './database-file.entity';

@Injectable()
export class DatabaseFileService {
  constructor(
    @InjectRepository(DatabaseFile)
    private readonly databaseFileRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFile(
    dataBuffer: Buffer,
    filename: string,
  ): Promise<DatabaseFile> {
    const newFile = await this.databaseFileRepository.create({
      filename,
      data: dataBuffer,
    });

    await this.databaseFileRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: string): Promise<DatabaseFile> {
    const file = await this.databaseFileRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      throw new NotFoundException();
    }

    return file;
  }
}
