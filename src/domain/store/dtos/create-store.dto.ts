import { IsNotEmpty, IsUUID } from 'class-validator';
import { StoreStatus } from '../interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ description: 'Name of the store' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Status of the store', enum: StoreStatus })
  @IsNotEmpty()
  status: StoreStatus;

  @ApiProperty({ description: 'UUID of the store owner' })
  @IsNotEmpty()
  @IsUUID()
  owner_id: string;
}
