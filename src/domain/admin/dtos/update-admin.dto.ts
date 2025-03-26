import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  @ApiProperty({ description: 'Name of the admin', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Username of the admin', required: false })
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'Email address of the admin', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Password for the admin account',
    required: false,
  })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
