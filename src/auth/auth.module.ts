import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers : [AuthController],
  providers: [AuthService , AuthRepository]
})
export class AuthModule {}
