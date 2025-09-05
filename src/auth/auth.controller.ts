import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dot';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
  ) {}
    @Get("rates")
    findRates () {
        return this.authService.findRates();
    }
    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    register (@Body() data : CreateUserDTO) {
        return this.authService.register(data);
    }
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login (@Body() data : LoginDTO) {
    return this.authService.login(data);
  }
}
