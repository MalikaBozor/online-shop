import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Name of the category', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the category', required: false })
  @IsOptional()
  description?: string;
}
