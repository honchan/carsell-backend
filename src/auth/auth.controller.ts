import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserInput } from '../user/inputs/create-user.input';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interface/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() input: CreateUserInput): Promise<void> {
    return this.authService.register(input);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser): Promise<string> {
    const user = request?.user;
    return this.authService.getJwtToken(user?.id);
  }

  @Post('test')
  @UseGuards(JwtAuthGuard)
  async test(@Body() body: any) {
    return 'success';
  }
}
