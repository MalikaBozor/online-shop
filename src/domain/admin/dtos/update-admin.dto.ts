import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
