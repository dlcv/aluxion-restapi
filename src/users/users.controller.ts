import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}
  
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser)
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id)
  }

  @Delete(':id')
  deleteOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteOneUser(id)
  }

  @Patch(':id')
  updateOneUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateOneUser(id, user)
  }

}
