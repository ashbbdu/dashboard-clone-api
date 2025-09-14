import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';

@Module({
    providers : [UserRolesService],
    exports : [UserRolesService]
})
export class UserRolesModule {}
