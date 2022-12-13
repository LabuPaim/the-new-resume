import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
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
          role: user.role,
        },
        include: {
          empresa: true,
          candidato: true,
          Vaga: true,
        },
      });
      return CreatedUser;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Email ja cadastrado');
    }
  }

  async updateUser(user: IUserEntity): Promise<IUserEntity> {
    try {
      const UpdatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          password: user.password,
          role: user.role,
        },
        include: { candidato: true, empresa: true, Vaga: true },
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
      const allUsers = await this.prisma.user.findMany({
        include: { candidato: true, empresa: true, Vaga: true },
      });
      return allUsers;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findUserById(id: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
        include: { candidato: true, empresa: true, Vaga: true },
      });

      return foundUser;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findUserByEmail(email: string): Promise<IUserEntity> {
    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: { email: email },
      });
      return foundUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'user not found with this email',
      );
    }
  }
}
