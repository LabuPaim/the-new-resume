import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: IUserEntity) {
    try {
      const CreatedUser = await this.prisma.user.create({ data: user });
      return CreatedUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Email ja cadastrado',
      );
    }
  }

  async updateUser(user: UpdateUserDto): Promise<IUserEntity> {
    const UpdatedUser = await this.prisma.user.update({
      where: { id: user.id, email: user.email },
      data: user,
    });
    return UpdatedUser;
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    const deletedUser = await this.prisma.user.delete({
      where: { id: id },
    });
    return deletedUser;
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findUserById(id: string): Promise<IUserEntity> {
    const foundUser = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });

    return foundUser;
  }
}
