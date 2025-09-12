import { Controller, Get } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
    constructor (private readonly organisationSerice : OrganisationService) {}
    @Get("/list")
    list () {
        
    }
}
