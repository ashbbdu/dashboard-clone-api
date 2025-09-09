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
import { User } from 'src/auth/auth.model';
import { ServiceTypes } from 'src/servicetype/servicetype.model';
import { Unloco } from 'src/unloco/unloco.model';
import { Organisation } from 'src/organisation/organsation.model';

//  { model: User, as: "salesExecutive", attributes: ["id", "first_name", "last_name", "email", "user_code"] },
//         { model: Organisation, as: "customerOrg", attributes: ["id", "name"] },
//         { model: ServiceType, as: "serviceType", attributes: ["id", "service_type"] },
//         { model: Unloco, as: "originPort", attributes: ["id", "code", "name", "country_name"] },
//         { model: Unloco, as: "destinationPort", attributes: ["id", "code", "name", "country_name"] },

@Injectable()
export class QuoteRepository {
  constructor(
    @InjectModel(Quote)
    private readonly quoteModel: typeof Quote, // <-- Model class injected
  ) {}

  async list() {
    const quote = await this.quoteModel.findAll({
      attributes : {exclude : ["sales_executive_id" , "organisation_id" , "service_type_id" , "origin_id" , "destination_id"]},
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

  async add(data: any) {
    const {
      quote_number,
      sales_executive_id,
      organisation_id,
      service_type_id,
      origin_id,
      destination_id,
      status,
      lost_reason,
      remark,
      notes,
    } = data;
    try {
      const createQuote = await this.quoteModel.create({
        quote_date: Date.now(),
        ...data,
      });
      return {
        message: 'Quote Created Successfully !',
        data: createQuote,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
