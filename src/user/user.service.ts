import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseFileService } from 'src/database-file/database-file.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly databaseFileService: DatabaseFileService,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input);
    await this.userRepository.save(user);
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { email } });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    const avatar = await this.databaseFileService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    await this.userRepository.update(userId, { avatarId: avatar.id });
    return avatar;
  }
}
