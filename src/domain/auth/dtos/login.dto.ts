import { IsNotEmpty } from 'class-validator';
import { IsPhoneNumber } from 'src/common';

export class LoginDto {
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}
