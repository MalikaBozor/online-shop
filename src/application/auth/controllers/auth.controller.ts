import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UserID, Public } from 'src/common/decorators';
import { AuthService, LoginDto, RegisterDto } from 'src/domain/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  // @Public()
  // @Post('verify')
  // async verify(@Body() dto: VerifyDto) {
  //   return await this.authService.verify(dto);
  // }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  // @Post('reset-password')
  // async resetPassword(@Body() dto: ResetPasswordDto, @UserID() id: string) {
  //   return await this.authService.resetPassword(dto, id);
  // }

  // @Post('forget-password')
  // async forgetPassword(dto: ForgetPasswordDto) {
  //   return await this.authService.forgetPassword(dto);
  // }

  // @Post('change-password')
  // async changePassword(@Param('token') token: string, dto: ResetPasswordDto) {
  //   return await this.authService.changePassword(token, dto);
  // }

  @Delete('delete/me')
  async deleteAccount(@UserID() id: string) {
    return await this.authService.deleteAccount(id);
  }

  // @Post('resend-otp')
  // async resendOtp(@Body('email') email: string) {
  //   return await this.authService.resendOtp(email);
  // }

  @Post('refresh-tokens')
  async refreshTokens(@Body('refresh_token') token: string) {
    return await this.authService.refreshTokens(token);
  }
}
