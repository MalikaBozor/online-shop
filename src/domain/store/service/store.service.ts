import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from '../entities/store.entity';
import { Repository } from 'typeorm';
import { UpdateStoreDto } from '../dtos/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}
  async create(dto: CreateStoreDto): Promise<StoreEntity> {
    return await this.storeRepository.save(dto);
  }

  async findAll(): Promise<StoreEntity[]> {
    return await this.storeRepository.find();
  }

  async findOne(id: string): Promise<StoreEntity> {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async update(id: string, dto: UpdateStoreDto): Promise<StoreEntity> {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storeRepository.update(id, dto);
    return Object.assign(store, dto);
  }

  async remove(id: string): Promise<void> {
    const store = await this.storeRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storeRepository.delete(id);
  }
}
