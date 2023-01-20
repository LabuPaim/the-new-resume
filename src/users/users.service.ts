import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Exception } from 'src/utils/exceptions/exception';
import {
  Exceptions,
  HandleException,
} from 'src/utils/exceptions/exceptionsHelper';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password.length <= 7) {
        throw new Exception(
          Exceptions.InvalidData,
          'A senha precisar ter no mínimo 8 caracteres',
        );
      }
      const userEntity = { ...createUserDto, id: randomUUID() };
      const hashedPassword = await hash(createUserDto.password, 10);
      userEntity.password = hashedPassword;

      const createdUser = await this.users.createUser(userEntity);
      return createdUser;
    } catch (error) {
      throw new Exception(error.exception, error.message);
    }
  }

  async update(updateUserDto: IUserEntity): Promise<IUserEntity> {
    try {
      if (updateUserDto.password) {
        const hashedPassword = await hash(updateUserDto.password, 10);
        const userToUpdate = { ...updateUserDto, password: hashedPassword };
        const updatedUser = await this.users.updateUser(userToUpdate);
        return updatedUser;
      }

      const updatedUser = await this.users.updateUser(updateUserDto);

      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      HandleException(error);
    }
  }

  async findAll(): Promise<IUserEntity[]> {
    try {
      return await this.users.findAllUsers();
    } catch (error) {
      HandleException(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.users.deleteUser(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findOne(id: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.users.findUserById(id);
      delete foundUser.password;
      return foundUser;
    } catch (error) {
      HandleException(error);
    }
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    try {
      const user = await this.users.findUserByEmail(email);
      return user;
    } catch (error) {
      HandleException(error);
    }
  }
}
