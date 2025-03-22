import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { IsPhoneNumber } from 'src/common';
import { UserRoles } from '../constants/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  google_id?: string;

  @IsNotEmpty()
  role: UserRoles;
}
