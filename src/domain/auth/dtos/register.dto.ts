import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumber } from 'src/common';

export class RegisterDto {
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  google_id: string;

  @IsNotEmpty()
  password: string;
}
