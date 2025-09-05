import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User)
    private readonly authModel: typeof User,
     private jwtService: JwtService
  ) {}

  async findRates() {
    return await this.authModel.findAll({
      attributes: ['id', 'firstName'],
    });
  }

  async register(data: any) {
    const existingUser = await this.authModel.findByPk(data.email);
    if (existingUser) {
      throw new ConflictException({
        status: '404',
        message: 'User already exist !',
      });
    }
    const user = await this.authModel.create(data);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return {
      message: 'User created successfully !',
      user,
    };
  }

  async login(data: any) {    
    const user = await this.authModel.findOne({ where: { email: data.email }, raw : true });
    console.log(user?.password , typeof user?.password)
     console.log(data?.password , typeof data?.password)

    if (!user) {
    throw new UnauthorizedException({ message: "User not found !" });
  }
    if (user?.password !== data.password) {
      throw new UnauthorizedException({message : "Invalid Password !"});
    }
     const payload = {id : user.id , firstNamme : user.firstName , lastName : user.lastName , email : user.email , user_code : user.user_code};
     const token = await this.jwtService.signAsync(payload)
        return {
            message : "Logged in successfully !",
            ...user , 
            token
        };
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
