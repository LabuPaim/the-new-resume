import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/auth.dto';
import { IUserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: UserLoginDto) {
    const user = await this.userService.findUserByEmail(email);

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new Exception(Exceptions.UnauthorizedException, 'Invalid password');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
        role: user.role,
      }),
      user,
    };
  }

  async getUser(email: string): Promise<IUserEntity> {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }
}
