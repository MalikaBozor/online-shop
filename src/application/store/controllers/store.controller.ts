import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/common';
import { UserRoles } from 'src/domain';
import { CreateStoreDto, StoreService, UpdateStoreDto } from 'src/domain/store';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @Get()
  @Roles(UserRoles.superAdmin)
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.superAdmin)
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
