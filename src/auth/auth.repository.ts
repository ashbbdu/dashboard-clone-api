import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from 'src/user_roles/user_role.model';
import { Role } from 'src/roles/role.model';
import { Quote } from 'src/quote/quote.model';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User)
    private readonly authModel: typeof User,
    private jwtService: JwtService,
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

//   async login(data: any) {
//     const user = await this.authModel.findOne({
//       where: { email: data.email  },
//       include: [
//         {
//           model: UserRoles,
//           include: [{ model: Role } ],
        
//         },
//         {
//           model: Quote,

//         },
//       ],
//     });
  
//     const roles = user?.dataValues.user_role.map((r => r.role.name))
    

//       if (!user?.dataValues) {
//     throw new UnauthorizedException({ message: "User not found!" });
// }

// if (user.dataValues.password !== data.password) {
//     throw new UnauthorizedException({ message: "Invalid Password!" });
// }
// const payload = {
//     id: user.dataValues.id,
//     firstName: user.dataValues.firstName,
//     lastName: user.dataValues.lastName,
//     email: user.dataValues.email,
//     user_code: user.dataValues.user_code
// };
// const quoteCount = user.dataValues.quote.length || 0;
// const token = await this.jwtService.signAsync(payload);
// const userDetails = {...user.get({plain : true}) , quote : quoteCount , user_role : undefined}

// return {
//     message: "Logged in successfully!",
//     ...userDetails,
//     roles,
//     token
// };
//   }

async login(data: any) {
  const user = await this.authModel.findOne({
    where: { email: data.email },
    include: [
      { model: UserRoles, include: [{ model: Role }] },
      { model: Quote },
    ],
  });

  if (!user) {
    throw new UnauthorizedException({ message: "User not found!" });
  }

  const userData = user.get({ plain: true });

  if (userData.password !== data.password) {
    throw new UnauthorizedException({ message: "Invalid Password!" });
  }

  // Extract roles
  const roles = (userData.user_role || []).map((r: any) => r.role.name);

  // Count quotes
  const quoteCount = (userData.quote || []).length;

  // Exclude unwanted fields using destructuring
  const { password, user_role, quote, ...cleanUser } = userData;

  const payload = {
    id: cleanUser.id,
    firstName: cleanUser.firstName,
    lastName: cleanUser.lastName,
    email: cleanUser.email,
    user_code: cleanUser.user_code,
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    message: "Logged in successfully!",
    ...cleanUser,
    roles,
    quoteCount,
    token,
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
