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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserEntity } from 'src/domain/user/entities/user.entity';

@ApiTags('Admins')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Create new admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully created',
    type: UserEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  create(@Body() createDto: CreateAdminDto) {
    return this.adminService.create(createDto);
  }

  @Get()
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of all admins',
    type: [UserEntity],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.superAdmin, UserRoles.admin)
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({ status: 200, description: 'Admin found', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Update admin' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({ status: 200, description: 'Admin updated', type: UserEntity })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateAdminDto) {
    return this.adminService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Delete admin' })
  @ApiParam({ name: 'id', description: 'Admin ID' })
  @ApiResponse({ status: 200, description: 'Admin deleted' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
