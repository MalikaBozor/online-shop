import { Column, Entity, ManyToOne } from 'typeorm';
import { UserRoles } from '../constants/user-role.enum';
import { BaseEntity } from 'src/common';
import { StoreEntity } from 'src/domain/store';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ unique: true, type: 'varchar' })
  phone_number: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  google_id: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    name: 'role',
    default: UserRoles.user,
  })
  role: UserRoles;

  @ManyToOne(() => StoreEntity, (store) => store.user)
  stores: StoreEntity[];
}
