import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UserRepository) {}

  async create(createUserDto: IUserEntity) {
    if (createUserDto.password.length <= 7) {
      throw new Exception(
        Exceptions.InvalidData,
        'A senha precisar ter no mínimo 8 caracteres',
      );
    }
    const userEntity = { ...createUserDto, id: randomUUID() };
    const createdUser = await this.users.createUser(userEntity);
    return createdUser;
  }

  async update(updateUserDto: IUserEntity): Promise<IUserEntity> {
    return this.users.updateUser(updateUserDto);
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.users.findAllUsers();
  }

  async remove(id: string) {
    return await this.users.deleteUser(id);
  }

  async findOne(id: string) {
    return await this.users.findUserById(id);
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    const user = await this.users.findUserByEmail(email);
    return user;
  }
}
