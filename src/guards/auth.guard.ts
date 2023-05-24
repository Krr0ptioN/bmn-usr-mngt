import {
  CanActivate,
  ExecutionContext
} from '@nestjs/common'

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const user = context.switchToHttp().getRequest();
    return user.session.userId;
  }
}
