import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteRepository } from './quote.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from './quote.model';

@Module({
  imports : [SequelizeModule.forFeature([Quote])],
  controllers: [QuoteController],
  providers: [QuoteService , QuoteRepository],
  exports: [QuoteRepository, QuoteService],
})
export class QuoteModule {}
