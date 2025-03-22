import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsPhoneNumber } from 'src/common';

export class CreateAdminDto {
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
