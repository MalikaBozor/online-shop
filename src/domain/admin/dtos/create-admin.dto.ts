import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsPhoneNumber } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'Full name of the admin' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'Phone number of the admin' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ description: 'Email address of the admin' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the admin account' })
  @IsStrongPassword()
  password: string;
}
