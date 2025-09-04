import { ConflictException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User)
    private readonly authModel: typeof User,
  ) {}

  async findRates() {
    return await this.authModel.findAll({
      attributes: ['id', 'firstName'],
    });
  }

  async register(data: any) {
    const existingUser = await this.authModel.findByPk(data.email);
    if(existingUser) {
        throw new ConflictException({
            status : "404",
            message : "User already exist !"
        });
    }
    const user = await this.authModel.create(data);
    if(!user) {
        throw new InternalServerErrorException();
    }
    return {
        message : "User created successfully !",
        user 
    }
  }


}


//  throw new HttpException({
    //   status: HttpStatus.FORBIDDEN,
    //   error: 'This is a custom message',
//     }, HttpStatus.FORBIDDEN, {
//       cause: error
//     });
//   }
// }