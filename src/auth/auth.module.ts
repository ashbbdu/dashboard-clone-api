import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/role.model';
import { Permissions } from 'src/permissions/permission.model';
import { UserRoles } from 'src/user_roles/user_role.model';
import { UserRolesModule } from 'src/user_roles/user_roles.module';

@Module({
  imports: [SequelizeModule.forFeature([User , Permissions, Role , UserRoles]) , JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET_KEY,
      secret : "lavinstar_vinworld_lsl_inj",
      signOptions: { expiresIn: '3060s' },
    }),
  PermissionsModule , RolesModule , UserRolesModule], // added newly
  controllers : [AuthController],
  providers: [AuthService , AuthRepository],
  exports : [AuthService , AuthRepository] // since we are using this in appmodule providers then we have to export this
})
export class AuthModule {}
