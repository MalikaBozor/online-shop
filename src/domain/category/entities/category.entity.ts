import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
