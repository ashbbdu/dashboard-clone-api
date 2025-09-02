import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor () {};
  findRates () {
        return {
            message : "hello how are you ?"
        }
    }
}
