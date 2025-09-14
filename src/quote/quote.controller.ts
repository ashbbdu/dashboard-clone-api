import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { Permissions, Roles } from 'src/decorators';
import { PermissionsGuard } from 'src/permissions/permission.guard';
import { RolesGuard } from 'src/roles/role.guard';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
@UseGuards(AuthGuard , PermissionsGuard , RolesGuard)
  @Get('list')
  @Roles('Admin' ,  "SalesRepresentative")
  @Permissions('VIEW_QUOTE')
  list(@Request() req) {
    console.log(req.user, 'user');
    return this.quoteService.list();
  }
@UseGuards(AuthGuard , PermissionsGuard , RolesGuard)
  @Post('add')
  @Roles('Admin')
  @Permissions('CREATE_QUOTE')
  add(@Body() data: CreateQuoteDTO, @Request() req) {
    console.log(req.user, 'user from add');
    return this.quoteService.add(data);
  }
@UseGuards(AuthGuard , PermissionsGuard , RolesGuard)
  @Put('update')
  update(@Body() data: any, @Request() req) {
    console.log(req.user, 'user from add');
    return this.quoteService.update(data);
  }
}
