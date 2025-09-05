import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
  ) {}
    @Get("login")
    findRates () {
        return this.authService.findRates();
    }

    @Post("register")
    register (@Body() data : any) {
        return this.authService.register(data);
    }

    @Post("login")
    login (@Body() data : any) {
    const user = this.authService.login(data);
  }
}
