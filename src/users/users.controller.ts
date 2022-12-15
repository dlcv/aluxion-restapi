import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteOneUser(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateOneUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateOneUser(id, user)
  }

}
