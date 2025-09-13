import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';
import { QuoteService } from './quote/quote.service';
import { QuoteModule } from './quote/quote.module';
import { OrganisationModule } from './organisation/organisation.module';
import { ServicetypeModule } from './servicetype/servicetype.module';
import { UnlocoModule } from './unloco/unloco.module';
import { Quote } from './quote/quote.model';
import { Organisation } from './organisation/organsation.model';
import { Unloco } from './unloco/unloco.model';
import { ServiceTypes } from './servicetype/servicetype.model';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { Permissions } from './permissions/permission.model';
import { RolePermissionService } from './role_permission/role_permission.service';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { RolePermission } from './role_permission/role_permission.model';
import { UserRolesService } from './user_roles/user_roles.service';
import { UserRolesModule } from './user_roles/user_roles.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      // host: process.env.HOST,
      // port: 3306,
      // username: process.env.USER_NAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      autoLoadModels : true,
      synchronize : true,
      logging: console.log,
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'ash@Compunnel09',
      database: 'dashboard-clone',
      models: [User , Quote , Organisation , Unloco , ServiceTypes , Role , Permissions , RolePermission],
      
      
    }),
    // module will come here
    AuthModule,
    QuoteModule,
    OrganisationModule,
    ServicetypeModule,
    UnlocoModule,
    PermissionsModule,
    RolesModule,
    RolePermissionModule,
    UserRolesModule
  ],
  controllers: [AppController, PermissionsController],
  providers: [AppService , AuthService, QuoteService, PermissionsService, RolePermissionService, UserRolesService]
})
export class AppModule {}
