import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly users: UserRepository) {}
  // private users: IUserEntity[] = [];

  async create(createUserDto: CreateUserDto) {
    const userEntity = { ...createUserDto, id: randomUUID() };
    const createdUser = await this.users.createUser(userEntity);
    return createdUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<IUserEntity> {

    
    return this.users.updateUser(
      updateUserDto
      
    );
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.users.findAllUsers();
  }

  async remove(id: string) {
    return await this.users.deleteUser(id)
  }

  async findOne(id: string) {
    return await this.users.findUserById(id);
  }
}
