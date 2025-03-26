import { IsNotEmpty } from 'class-validator';
import { IsPhoneNumber } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Phone number for authentication' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ description: 'Password for authentication' })
  @IsNotEmpty()
  password: string;
}
