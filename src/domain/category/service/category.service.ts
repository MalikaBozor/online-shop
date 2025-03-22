import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({
      name: dto.name,
    });
    if (category) {
      throw new ConflictException('Category already exits');
    }
    return await this.categoryRepository.save(dto);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const oldCategory = await this.categoryRepository.findOneBy({
      name: dto.name,
    });
    if (!oldCategory) {
      throw new BadRequestException('Category not found');
    }
    if (dto?.name) {
      const category = await this.categoryRepository.findOneBy({
        name: dto.name,
      });
      if (category) {
        throw new ConflictException('Category already exits');
      }
    }
    await this.categoryRepository.update(id, dto);
    return { ...oldCategory, ...dto };
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    await this.categoryRepository.delete(id);
  }
}
