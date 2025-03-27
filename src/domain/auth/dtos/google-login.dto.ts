import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({
    description: 'Google ID token',
    example: '123456789googleid',
  })
  @IsNotEmpty()
  google_id: string;
}
