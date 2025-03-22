import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from '../config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: config.USER_EMAIL,
          pass: config.APP_PASSWORD,
        },
        port: 587,
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
