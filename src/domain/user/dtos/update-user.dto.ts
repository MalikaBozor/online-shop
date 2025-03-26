import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Username of the user', required: false })
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Password for the account', required: false })
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'Whether the user is active', required: false })
  @IsOptional()
  is_active?: boolean;
}
