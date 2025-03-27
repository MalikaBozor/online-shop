import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserEntity, UserRoles, UserService } from 'src/domain/user';
import { RedisService } from 'src/infrastructure/redis/redis.service';
import { HashingService, MailService, TokenService } from 'src/infrastructure';
import { ILogin, IRefreshAccess } from '../interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly mailerService: MailService,
    private readonly hashingService: HashingService,
    private readonly jwtService: TokenService,
  ) {}
  async register(dto: RegisterDto): Promise<UserEntity> {
    const [exitingUsername, exitingEmail] = await Promise.all([
      this.userService.isPhoneExists(dto.phone_number),
      this.userService.isEmailExists(dto.email),
    ]);
    if (exitingUsername) {
      throw new ConflictException('Phone number already exists');
    }
    if (exitingEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userService.create({
      ...dto,
      role: UserRoles.user,
    });
    delete user.password;
    return user;
  }

  async login(dto: LoginDto): Promise<ILogin> {
    const user = await this.userService.findByEmail(dto.phone_number);
    const checkPassword = await this.hashingService.compare(
      dto.password,
      user.password,
    );
    if (!checkPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.createAccessToken(payload);
    const refreshToken = this.jwtService.createRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  async loginWithGoogle(googleId: string): Promise<ILogin> {
    const user = await this.userService.findByGoogleId(googleId);

    if (!user) {
      throw new BadRequestException('User not found with this Google ID');
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.createAccessToken(payload);
    const refreshToken = this.jwtService.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
  // async resetPassword(dto: ResetPasswordDto, id: string): Promise<IMessage> {
  //   const hashPassword = await this.hashingService.encrypt(dto.password);
  //   dto.password = hashPassword;
  //   await this.userService.update(id, dto);
  //   return {
  //     message: 'Password updated',
  //   };
  // }
  // async forgetPassword(dto: ForgetPasswordDto): Promise<IForget> {
  //   const user = await this.userService.findByEmail(dto.email);
  //   const payload = {
  //     id: user.id,
  //   };
  //   const forgetToken = this.jwtService.createForgetToken(payload);
  //   return {
  //     forgetToken,
  //   };
  // }
  // async changePassword(
  //   token: string,
  //   dto: ResetPasswordDto,
  // ): Promise<IMessage> {
  //   const decode = await this.jwtService.verifyForgetToken(token);
  //   const hashPassword = await this.hashingService.encrypt(dto.password);
  //   dto.password = hashPassword;
  //   await this.userService.update(decode.id, dto);
  //   return {
  //     message: 'Passwrod updated',
  //   };
  // }
  async deleteAccount(id: string): Promise<void> {
    await this.userService.delete(id);
  }
  async refreshTokens(refresh_token: string): Promise<IRefreshAccess> {
    const decode = await this.jwtService.verifyRefreshToken(refresh_token);
    const payload = {
      id: decode.id,
      role: decode.role,
    };
    const accessToken = this.jwtService.createAccessToken(payload);
    return {
      accessToken,
    };
  }

  // async resendOtp(email: string): Promise<void> {
  //   const user = await this.userService.findByEmail(email);
  //   const otp = this.otpGenerator();
  //   await Promise.all([
  //     this.redisService.set(user.username, otp, 240),
  //     this.mailerService.sendOtp(user.email, otp),
  //   ]);
  // }

  private otpGenerator(): string {
    const otp = Math.floor((Math.random() * 10 ** 6 * 1.145) % 10 ** 6);
    return String(otp);
  }
}
