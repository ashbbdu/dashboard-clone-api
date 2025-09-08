import { Module } from '@nestjs/common';
import { ServicetypeService } from './servicetype.service';
import { ServicetypeController } from './servicetype.controller';

@Module({
  providers: [ServicetypeService],
  controllers: [ServicetypeController]
})
export class ServicetypeModule {}
