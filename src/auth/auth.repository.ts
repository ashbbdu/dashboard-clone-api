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
import { RolePermission } from 'src/role_permission/role_permission.model';
import { Permissions } from 'src/permissions/permission.model';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User)
    private readonly authModel: typeof User,
    @InjectModel(Permissions)
    private readonly permissionModel: typeof Permissions,
    @InjectModel(Role) private readonly rolenModel: typeof Role,
    @InjectModel(UserRoles) private readonly usrRoleModel: typeof UserRoles,
    @InjectModel(RolePermission) private readonly rolePermissionModel: typeof RolePermission,
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

  async login(data: any) {
    const user = await this.authModel.findOne({
      where: { email: data.email },
      include: [
        {
          model: Role,
          through: { attributes: [] }, // hide UserRoles junction table
          include: [
            {
              model: Permissions,
              through: { attributes: [] }, // hide RolePermissions junction table
            },
          ],
        },
        {
          model: Quote,
        },
      ],
    });

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found!' });
    }

    const userData = user.get({ plain: true });

    if (userData.password !== data.password) {
      throw new UnauthorizedException({ message: 'Invalid Password!' });
    }

    // Extract roles
    const roles = (userData.roles || []).map((r: any) => r.name);

    // Extract permissions
    const permissions = (userData.roles || []).flatMap((r: any) =>
      (r.permissions || []).map((p: any) => p.name),
    );

    // Count quotes
    const quoteCount = (userData.quote || []).length;

    // Exclude unwanted fields
    const { password, roles: _roles, quote, ...cleanUser } = userData;

    const payload = {
      id: cleanUser.id,
      firstName: cleanUser.firstName,
      lastName: cleanUser.lastName,
      email: cleanUser.email,
      user_code: cleanUser.user_code,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Logged in successfully!',
      name: cleanUser.firstName + cleanUser.lastName,
      email: cleanUser.email,
      roles,
      permissions,
      token,
    };
  }

  async verifiyRole(req, chosenRole) {
    console.log(chosenRole.choosenRole, 'choosen role');

    const userId = req.user.id; // extracted from login token
    const user = await this.authModel.findOne({
      where: { id: userId },
      include: [{ model: Role, through: { attributes: [] } }],
    });

    const roles = await this.usrRoleModel.findAll({
      where: { user_id: userId },
      include: { model: Role },
      attributes: [],
    });
    const currentRole = await this.rolenModel.findByPk(chosenRole.choosenRole);

    const permissions = await this.rolePermissionModel.findAll({where : {role_id : currentRole?.id} , include : {model : Permissions}})
    const userPermissions = permissions.map(r => r.permission.name)

    const activeRole = currentRole?.name;

    if (!user) throw new UnauthorizedException('User not found');

    const userRoles = roles.map((r) => r.role.name);
    console.log(userRoles, 'usrroles');

    if (!userRoles.includes(activeRole || '')) {
      throw new UnauthorizedException({
        message: 'Role not assigned to user !',
        statusCode: 401,
      });
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      user_code: user.user_code,
      userRoles,
      activeRole,
      permissions : userPermissions
    };
    const finalUser = {...user.dataValues , roles : undefined , password : undefined}
    const finalToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      message: `Role assigned successfully.`,
      user : finalUser,
      activeRole,
      userRoles,
      permissions : userPermissions,
      token: finalToken,
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
