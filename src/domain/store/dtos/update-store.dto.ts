import { IsOptional, IsString, IsUUID } from 'class-validator';
import { StoreStatus } from '../interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty({ description: 'Name of the store', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Status of the store',
    enum: StoreStatus,
    required: false,
  })
  @IsOptional()
  status?: StoreStatus;

  @ApiProperty({ description: 'UUID of the store owner', required: false })
  @IsOptional()
  @IsUUID()
  owner_id?: string;
}
