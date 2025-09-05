import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User]) , JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET_KEY,
      secret : "lavinstar_vinworld_lsl_inj",
      signOptions: { expiresIn: '3060s' },
    }),],
  controllers : [AuthController],
  providers: [AuthService , AuthRepository]
})
export class AuthModule {}
