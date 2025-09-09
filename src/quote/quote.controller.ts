import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
    constructor (private readonly quoteService : QuoteService) {}
    @Get("list") 
    list () {
        return this.quoteService.list();
    }

    @Post("add")
    add (@Body() data : any) {
        return this.quoteService.add(data);
    }
}
