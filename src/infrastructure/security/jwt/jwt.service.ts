import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/infrastructure/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: config.ACCESS_SECRET,
      expiresIn: config.ACCESS_TIME,
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: config.REFRESH_SECRET,
      expiresIn: config.REFRESH_TIME,
    });
  }

  createForgetToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: config.REFRESH_SECRET,
      expiresIn: config.REFRESH_TIME,
    });
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.ACCESS_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.REFRESH_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyForgetToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.REFRESH_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
