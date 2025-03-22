import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(to: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  async sendPasswordReset(to: string, token: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Reset Your Password',
        html: `<h2>Reset Your Password</h2>
               <p>Click the button below to reset your password.</p>
               <a href="https://example.com/change-password?token=${token}" class="button">Reset Password</a>`,
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendActivationLink(to: string, token: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Activate Your Account',
        html: `<h2>Activate Your Email</h2>
               <p>Click the button below to activate your email.</p>
               <a href="http://localhost:3000/admin/verify?token=${token}" class="button">Activate</a>`,
      });
    } catch (error) {
      console.error('Failed to send activation email:', error);
      throw new Error('Failed to send activation email');
    }
  }
}
