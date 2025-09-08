import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService {
    constructor () {}
     list () {
        return "quote list service";
    }
}
