import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class IsUserAuthorization implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();

    const userData = httpRequest.user;

    if (userData?.role === 'candidato' || userData?.role === 'empresa') {
      return true;
    }

    throw new UnauthorizedException(
      'user not have permission to access this route',
    );
  }
}
