import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    console.log(requiredPermissions , "req per");
    
    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const userPermissions = request.user.permissions || [];
    console.log(request.user , "userper")

    const hasAll = requiredPermissions.every(p => userPermissions.includes(p));
    console.log(hasAll , "hasall");
    
    if (!hasAll) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}
