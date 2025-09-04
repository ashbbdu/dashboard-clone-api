import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor (private readonly authRepo : AuthRepository) {};
  findRates () {
        return this.authRepo.findRates();
    }
    register (data : any) {
        return this.authRepo.register(data);
    }
}
