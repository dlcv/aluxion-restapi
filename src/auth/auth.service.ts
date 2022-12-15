import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto
    const user = await this.usersService.getOneUserByEmail(email)
    user.resetPasswordToken = v4();
    this.usersRepository.save(user);
    // TO-DO: send resetPasswordToken by email
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user = await this.usersService.getOneUserByResetPasswordToken(resetPasswordToken)
    user.password = await bcrypt.hash(password, saltOrRounds);
    user.resetPasswordToken = null
    return this.usersRepository.save(user)
  }
}