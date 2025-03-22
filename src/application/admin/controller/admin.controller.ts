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
import {
  AdminService,
  CreateAdminDto,
  UpdateAdminDto,
  UserRoles,
} from 'src/domain';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  create(@Body() createDto: CreateAdminDto) {
    return this.adminService.create(createDto);
  }

  @Get()
  @Roles(UserRoles.superAdmin)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.superAdmin, UserRoles.admin)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.superAdmin)
  update(@Param('id') id: string, @Body() updateDto: UpdateAdminDto) {
    return this.adminService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
