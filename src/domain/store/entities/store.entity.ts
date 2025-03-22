import { BaseEntity } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StoreStatus } from '../interface';
import { UserEntity } from 'src/domain/user';

@Entity('store')
export class StoreEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: StoreStatus })
  status: StoreStatus;

  @Column({ type: 'uuid', name: 'owner_id' })
  owner_id: string;

  @ManyToOne(() => UserEntity, (user) => user.stores)
  @JoinColumn({ name: 'owner_id' })
  user: UserEntity;
}
