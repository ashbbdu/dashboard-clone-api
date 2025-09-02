import { Injectable } from "@nestjs/common";
import { User } from "./auth.model";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User)
    private readonly authModel: typeof User,
  ) {}

  async findRates() {
    return await this.authModel.findAll({
        attributes : ['id' , "firstName"]
    });
  }
}