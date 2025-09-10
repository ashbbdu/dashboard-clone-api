// import { Injectable } from "@nestjs/common";
// import { Quote } from "./quote.model";
// @Injectable()
// export class QuoteRepository {
//     constructor (private readonly quoteModel : typeof Quote) {}
//     async list () {
//         const data = await this.quoteModel.findAll();
//     }
// }

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quote } from './quote.model';
import { User } from 'src/auth/auth.model';
import { ServiceTypes } from 'src/servicetype/servicetype.model';
import { Unloco } from 'src/unloco/unloco.model';
import { Organisation } from 'src/organisation/organsation.model';
import { CreateQuoteDTO } from './dto/create-quote.dto';

@Injectable()
export class QuoteRepository {
  constructor(
    @InjectModel(Quote)
    private readonly quoteModel: typeof Quote, // <-- Model class injected
  ) {}

  async list() {
    const quote = await this.quoteModel.findAll({
      attributes: {
        exclude: [
          'sales_executive_id',
          'organisation_id',
          'service_type_id',
          'origin_id',
          'destination_id',
        ],
      },
      include: [
        { model: User },
        { model: ServiceTypes },
        { model: Unloco, as: 'origin' },
        { model: Unloco, as: 'destination' },
        { model: Organisation },
      ],
    });
    return {
      message: 'Quotes fetched successfully !',
      quote,
    };
  }

//   async add(data: CreateQuoteDTO) {
//     try {
//       const existingQuote = await this.quoteModel.findOne({
//         where: { quote_number: data.quote_number },
//         raw: true,
//       });
//       if (existingQuote) {
//         throw new ConflictException({
//           status: '404',
//           message: 'Quote already exist !',
//         });
//       }
//       const createQuote = await this.quoteModel.create({
//         quote_date: new Date(),
//         ...data,
//       });
//       return {
//         message: 'Quote Created Successfully !',
//         data: createQuote,
//       };
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   }

  async add(data: CreateQuoteDTO) {

      const existingQuote = await this.quoteModel.findOne({
        where: { quote_number: data.quote_number },
        raw: true,
      });
      if (existingQuote) {
        throw new ConflictException({
          status: '404',
          message: 'Quote already exist !',
        });
      }
      const createQuote = await this.quoteModel.create({
        quote_date: new Date(),
        ...data,
      });
      return {
        message: 'Quote Created Successfully !',
        data: createQuote,
      };

  }
}

// const {
//   quote_number,
//   sales_executive_id,
//   organisation_id,
//   service_type_id,
//   origin_id,
//   destination_id,
//   status,
//   lost_reason,
//   remark,
//   notes,
// } = data;
