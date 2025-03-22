import { IsNotEmpty, IsUUID } from 'class-validator';
import { StoreStatus } from '../interface';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: StoreStatus;

  @IsNotEmpty()
  @IsUUID()
  owner_id: string;
}
