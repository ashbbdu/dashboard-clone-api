import { Module } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';

@Module({
    providers : [RolePermissionService],
    exports : [RolePermissionService]
})
export class RolePermissionModule {}
