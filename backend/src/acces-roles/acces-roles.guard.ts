import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './acces-roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccesRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const role = this.jwtUnpack(context);
    if (!roles.includes(role)) {
      return false;
    }
    this.insertRoleIntoRequest(role, context);
    return true;
  }

  private insertRoleIntoRequest(role: Role, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.user.role = role;
  }

  private jwtUnpack(context: ExecutionContext): Role {
    const { rawHeaders } = context.switchToHttp().getRequest();
    const jwt = rawHeaders[rawHeaders.indexOf('Authorization') + 1];
    const jwtPayload = jwt.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    const jwtPayloadDecoded = this.jwtService.verify(jwtPayload, { secret });
    const { role } = jwtPayloadDecoded;
    return role;
  }
}
