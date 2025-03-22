import { IsOptional, IsString, IsUUID } from 'class-validator';
import { StoreStatus } from '../interface';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  status?: StoreStatus;

  @IsOptional()
  @IsUUID()
  owner_id?: string;
}
