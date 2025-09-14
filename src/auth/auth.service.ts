import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor (private readonly authRepo : AuthRepository) {};
  findRates () {
        return this.authRepo.findRates();
    }
    register (data : any) {
        console.log(data)
        return this.authRepo.register(data);
    }
     login (data : any) {
        return this.authRepo.login(data);
    }

    verifyRole (req , chosenRole : number) {
        
        return this.authRepo.verifiyRole(req , chosenRole);
    }
}
