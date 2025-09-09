import { Injectable } from '@nestjs/common';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuoteService {
    constructor (private readonly quoteRepository : QuoteRepository) {}
     list () {
        return this.quoteRepository.list();
    }

    add (data : any) {
        return this.quoteRepository.add(data);
    }
}
