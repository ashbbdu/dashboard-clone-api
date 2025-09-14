// src/common/decorators.ts
import { SetMetadata } from '@nestjs/common';

/**
 * Roles decorator
 * 
 * Use this to attach roles metadata to route handlers or controllers.
 * Guards can then read this metadata to enforce role-based access.
 * 
 * Example:
 *   @Roles('Admin', 'Manager')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

/**
 * Permissions decorator
 * 
 * Use this to attach permissions metadata to route handlers or controllers.
 * Guards can then read this metadata to enforce permission-based access.
 * 
 * Example:
 *   @Permissions('CREATE_QUOTE', 'VIEW_QUOTE')
 */
export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
