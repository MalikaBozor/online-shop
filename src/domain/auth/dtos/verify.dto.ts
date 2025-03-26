import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({ description: 'User ID to verify' })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'One-time password (OTP) code' })
  @IsNotEmpty()
  otp: string;
}
