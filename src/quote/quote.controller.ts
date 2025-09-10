import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateQuoteDTO } from './dto/create-quote.dto';
@UseGuards(AuthGuard)
@Controller('quote')
export class QuoteController {
    constructor (private readonly quoteService : QuoteService) {}

    @Get("list") 
    list (@Request() req) {
        console.log(req.user , "user")
        return this.quoteService.list();
    }

    @Post("add")
    add (@Body() data : CreateQuoteDTO , @Request() req ) {
        console.log(req.user , "user from add")
        return this.quoteService.add(data);
    }
}
