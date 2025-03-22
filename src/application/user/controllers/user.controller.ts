import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { Roles } from 'src/common';
import { UpdateUserDto, UserRoles, UserService } from 'src/domain';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRoles.admin, UserRoles.superAdmin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  @Roles(UserRoles.admin, UserRoles.superAdmin)
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
