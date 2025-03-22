import { Module } from '@nestjs/common';
import { StoreController } from './controllers/store.controller';
import { StoreEntity, StoreService } from 'src/domain/store';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [],
})
export class StoreModule {}
