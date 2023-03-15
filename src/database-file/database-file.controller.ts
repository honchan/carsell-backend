import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { DatabaseFileService } from './database-file.service';

@Controller('database-file')
export class DatabaseFileController {
  constructor(private readonly databaseFileService: DatabaseFileService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.databaseFileService.getFileById(id);
    const stream = Readable.from(file.data);

    response.set({
      'Content-Disposition': `inline; filename=${file.filename}`,
      'Content-Type': 'image',
    });
    return new StreamableFile(stream);
  }
}
