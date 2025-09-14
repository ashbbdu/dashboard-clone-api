import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(requiredRoles , "req roles")
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(!user || !requiredRoles.includes(user.activeRole), "value")
    if (!user || !requiredRoles.includes(user.activeRole)) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
