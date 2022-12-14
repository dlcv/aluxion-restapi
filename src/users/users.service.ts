import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { email: user.email }
    })

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }
    
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getOneUser(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { id }
    })
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async getOneUserByEmail(email: string): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { email }
    })
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async deleteOneUser(id: number) {
    const result = await this.userRepository.delete({ id })
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  async updateOneUser(id: number, user: UpdateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { id }
    })

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const updatedUser = Object.assign(userFound, user)
    return this.userRepository.save(updatedUser)
  }

}
