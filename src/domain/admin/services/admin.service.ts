import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dtos/create-admin.dto';
import { UpdateAdminDto } from '../dtos/update-admin.dto';
import { UserEntity, UserRoles, UserService } from 'src/domain/user';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}
  async create(dto: CreateAdminDto): Promise<UserEntity> {
    const [exitingUsername, exitingEmail] = await Promise.all([
      this.userService.isPhoneExists(dto.phone_number),
      this.userService.isEmailExists(dto?.email),
    ]);
    if (exitingUsername) {
      throw new ConflictException('Username already exists');
    }
    if (exitingEmail) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.userService.create({
      ...dto,
      role: UserRoles.admin,
    });
    delete user.password;
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findByRole(UserRoles.admin);
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userService.findById(id);
  }

  async update(id: string, dto: UpdateAdminDto): Promise<UserEntity> {
    return await this.userService.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
