import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { AdminService } from 'src/domain';
import { UserModule } from '../user/user.module';
import { HashingService } from 'src/infrastructure';

@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [AdminService, HashingService],
})
export class AdminModule {}
