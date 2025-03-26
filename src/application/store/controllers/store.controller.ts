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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StoreEntity } from 'src/domain/store/entities/store.entity';

@ApiTags('Stores')
@ApiBearerAuth()
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({
    status: 201,
    description: 'Store successfully created',
    type: StoreEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @Get()
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({
    status: 200,
    description: 'List of all stores',
    type: [StoreEntity],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Store found',
    type: StoreEntity,
  })
  @ApiResponse({ status: 404, description: 'Store not found' })
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Update a store' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Store successfully updated',
    type: StoreEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  @ApiResponse({ status: 404, description: 'Store not found' })
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  @ApiOperation({ summary: 'Delete a store' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'Store successfully deleted' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Super Admin access required',
  })
  @ApiResponse({ status: 404, description: 'Store not found' })
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
