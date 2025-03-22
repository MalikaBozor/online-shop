import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/domain';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
