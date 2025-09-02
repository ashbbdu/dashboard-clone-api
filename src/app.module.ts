import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';


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
      models: [User],
      
      
    }),
    // module will come here
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
