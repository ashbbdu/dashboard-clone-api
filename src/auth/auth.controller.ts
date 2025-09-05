import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

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
    register (@Body() data : CreateUserDTO) {
        return this.authService.register(data);
    }
     @HttpCode(HttpStatus.OK)
    @Post("login")
    login (@Body() data : any) {
    return this.authService.login(data);
  }
}
