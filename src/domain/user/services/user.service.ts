import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashingService } from 'src/infrastructure';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRoles } from '../constants/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
  ) {}
  async isPhoneExists(phone_number: string): Promise<boolean> {
    if (!phone_number) return false;
    const user = await this.userRepository.findOneBy({ phone_number });
    return !!user;
  }

  async isEmailExists(email: string): Promise<boolean> {
    if (!email) return false;
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByGoogleId(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ google_id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findByPhone(phone_number: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ phone_number });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await this.hashingService.encrypt(dto.password);
    const user = await this.userRepository.save({
      ...dto,
      password: hashPassword,
    });
    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByRole(role: UserRoles): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { role } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (dto?.password) {
      const hashPassword = await this.hashingService.encrypt(dto.password);
      dto.password = hashPassword;
    }
    await this.userRepository.update(id, dto);
    Object.assign(user, dto);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }
}
