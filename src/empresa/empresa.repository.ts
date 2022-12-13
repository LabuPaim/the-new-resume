import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IEmpresaEntity } from './entities/empresa.entity';

@Injectable()
export class EmpresaRepository {
  constructor(private prisma: PrismaService) {}

  async createEmpresa(empresa: IEmpresaEntity) {
    try {
      
      const CreatedEmpresa = await this.prisma.empresa.create({
        data: {
          id: empresa.id,
          userId: empresa.userId,
          nome: empresa.nome,
          cnpj: empresa.cnpj,
          telefone: empresa.telefone,
          cidade: empresa.cidade,
          estado: empresa.estado,
          descricao: empresa.descricao,
        },
        include: {
          user: true,
          vaga: true,
          links: true,
        },
      });
      return CreatedEmpresa;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Email ja cadastrado');
    }
  }

  async updateEmpresa(empresa: IEmpresaEntity): Promise<IEmpresaEntity> {
    try {
      const UpdatedEmpresa = await this.prisma.empresa.update({
        where: { id: empresa.id },
        data: {
          userId: empresa.userId,
          nome: empresa.nome,
          cnpj: empresa.cnpj,
          telefone: empresa.telefone,
          cidade: empresa.cidade,
          estado: empresa.estado,
          descricao: empresa.descricao,
        },
        include: {
          user: true,
          vaga: true,
          links: true,
        },
      });
      return UpdatedEmpresa;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteEmpresa(id: string) {
    try {
      const deletedEmpresa = await this.prisma.empresa.delete({
        where: { id: id },
      });
      return deletedEmpresa;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Usuário não encontrado no banco de dados',
      );
    }
  }

  async findAllEmpresa() {
    try {
      const allEmpresa = await this.prisma.empresa.findMany({
        include: { user: true, vaga: true, links: true },
      });
      return allEmpresa;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findEmpresaById(id: string) {
    try {
      const foundEmpresa = await this.prisma.empresa.findUniqueOrThrow({
        where: { id: id },
        include: { user: true, vaga: true, links: true },
      });

      return foundEmpresa;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
