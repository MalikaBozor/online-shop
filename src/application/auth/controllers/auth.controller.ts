import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UserID, Public } from 'src/common/decorators';
import { AuthService, LoginDto, RegisterDto } from 'src/domain/auth';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { GoogleLoginDto } from 'src/domain/auth/dtos/google-login.dto';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Phone number or email already exists',
  })
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
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
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
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({ status: 200, description: 'Account successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteAccount(@UserID() id: string) {
    return await this.authService.deleteAccount(id);
  }

  // @Post('resend-otp')
  // async resendOtp(@Body('email') email: string) {
  //   return await this.authService.resendOtp(email);
  // }

  @Post('refresh-tokens')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshTokens(@Body('refresh_token') token: string) {
    return await this.authService.refreshTokens(token);
  }

  @Public()
  @Post('google-login')
  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in with Google',
    schema: {
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid Google ID' })
  async loginWithGoogle(@Body() dto: GoogleLoginDto) {
    return await this.authService.loginWithGoogle(dto.google_id);
  }
}
