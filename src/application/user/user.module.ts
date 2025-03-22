import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserService } from 'src/domain';
import { UserController } from '../user/controllers/user.controller';
import { HashingService } from 'src/infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, HashingService],
  exports: [UserService],
})
export class UserModule {}
