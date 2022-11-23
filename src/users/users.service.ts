import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: IUserEntity[] = [];

  async create(createUserDto: CreateUserDto): Promise<IUserEntity> {
    const userEntity = { ...createUserDto, id: randomUUID() };
    this.users.push(userEntity);
    return userEntity;
  }

  async update(updateUserDto: UpdateUserDto): Promise<IUserEntity> {
    this.users.map((user, index) => {
      if (user.id === updateUserDto.id) {
        const UpdatedUser = Object.assign(user, updateUserDto);
        this.users.splice(index, 1, UpdatedUser);
      }
    });
    const updatedUser = this.users.find((user) => user.id === updateUserDto.id);
    return updatedUser;
  }
  
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
