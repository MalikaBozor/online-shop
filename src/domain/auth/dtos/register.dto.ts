import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumber } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ description: 'Phone number for registration' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Google ID for social login', required: false })
  @IsString()
  @IsOptional()
  google_id: string;

  @ApiProperty({ description: 'Password for the account' })
  @IsNotEmpty()
  password: string;
}
