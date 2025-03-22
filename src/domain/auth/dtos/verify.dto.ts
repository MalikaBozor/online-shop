import { IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  otp: string;
}
