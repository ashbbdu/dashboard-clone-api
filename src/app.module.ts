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
      models: [],
      
      
    }),
    // module will come here
    AuthModule,
    QuoteModule,
    OrganisationModule,
    ServicetypeModule,
    UnlocoModule
  ],
  controllers: [AppController],
  providers: [AppService, QuoteService]
})
export class AppModule {}
