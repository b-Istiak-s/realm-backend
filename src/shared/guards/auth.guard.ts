import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthTokenService } from 'src/user/auth/auth-token.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const authToken = await this.authTokenService.validateToken(token);

    if (!authToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req.userId = authToken.user.id;
    return true;
  }
}
