import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from './auth-token.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthTokenService {
  constructor(
    @InjectRepository(AuthToken)
    private readonly authTokenRepo: Repository<AuthToken>,
  ) {}

  async createToken(userId: number): Promise<string> {
    const token = new AuthToken();
    token.userId = userId;
    token.token = randomBytes(32).toString('hex');
    await this.authTokenRepo.save(token);
    return token.token;
  }

  async validateToken(token: string): Promise<AuthToken | null> {
    return this.authTokenRepo.findOne({ where: { token } });
  }
}
