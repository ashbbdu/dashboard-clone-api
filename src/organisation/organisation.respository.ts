import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Organisation } from "./organsation.model";

@Injectable()
export class OrganisationRepository {
    constructor(
        @InjectModel(Organisation)
        private readonly authModel: typeof Organisation,
      ) {}
}