import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dot';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('rates')
  findRates() {
    // will change this later
    return this.authService.findRates();
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('assign-role')
  verifyRole(@Request() req, @Body() choosenRole: number) {
   return this.authService.verifyRole(req , choosenRole);
  }
}
