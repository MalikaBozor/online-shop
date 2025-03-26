import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { IsPhoneNumber } from 'src/common';
import { UserRoles } from '../constants/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the account' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ description: 'Google ID for social login', required: false })
  @IsOptional()
  google_id?: string;

  @ApiProperty({ description: 'Role of the user', enum: UserRoles })
  @IsNotEmpty()
  role: UserRoles;
}
