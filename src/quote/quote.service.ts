import { Injectable } from '@nestjs/common';
import { QuoteRepository } from './quote.repository';
import { CreateQuoteDTO } from './dto/create-quote.dto';

@Injectable()
export class QuoteService {
    constructor (private readonly quoteRepository : QuoteRepository) {}
     list () {
        return this.quoteRepository.list();
    }

    add (data : CreateQuoteDTO) {
        return this.quoteRepository.add(data);
    }


    update (data : any) {
        return this.quoteRepository.update(data);
    }
}
