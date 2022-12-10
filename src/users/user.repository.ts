import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/utils/enum/enum';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: IUserEntity) {
    try {
      const CreatedUser = await this.prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          role: Role.CANDIDATO,
        },
      });
      return CreatedUser;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Email ja cadastrado');
    }
  }

  async updateUser(user: UpdateUserDto): Promise<IUserEntity> {
    try {
      const UpdatedUser = await this.prisma.user.update({
        where: { id: user.id, email: user.email },
        data: user,
      });
      return UpdatedUser;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id: id },
      });
      return deletedUser;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Usuário não encontrado no banco de dados',
      );
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    try {
      const allUsers = await this.prisma.user.findMany();
      return allUsers;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findUserById(id: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });

      return foundUser;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
