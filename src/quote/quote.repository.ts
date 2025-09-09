// import { Injectable } from "@nestjs/common";
// import { Quote } from "./quote.model";
// @Injectable()
// export class QuoteRepository {
//     constructor (private readonly quoteModel : typeof Quote) {}
//     async list () {
//         const data = await this.quoteModel.findAll();
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quote } from './quote.model';

@Injectable()
export class QuoteRepository {
  constructor(
    @InjectModel(Quote)
    private readonly quoteModel: typeof Quote, // <-- Model class injected
  ) {}

  async list() {
    const quote = await this.quoteModel.findAll();
    return {
      message: 'Quotes fetched successfully !',
      quote,
    };
  }

  async add(data : any) {
    return {
        message : "Quote Created Successfully !",
        data
    }
  }
}
