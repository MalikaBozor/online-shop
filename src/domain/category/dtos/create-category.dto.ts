import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the category', required: false })
  @IsOptional()
  description?: string;
}
