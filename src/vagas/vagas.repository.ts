import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IVagasEntity } from './entities/vagas.entity';

@Injectable()
export class VagasRepository {
  constructor(private prisma: PrismaService) {}

  async createVagas(vaga: IVagasEntity) {
    try {
      const CreatedVaga = await this.prisma.vaga.create({
        data: {
          id: vaga.id,
          userId: vaga.userId,
          descricao: vaga.descricao,
          formacao: vaga.formacao,
          experiencia: vaga.experiencia,
          stack: vaga.stack,
          nivel: vaga.nivel,
          habilidades: vaga.habilidades,
          contratos: vaga.contratos,
          office: vaga.office,
          deficiencia: vaga.deficiencia,
        },
        include: {
          user: true,
          candidato: true,
        },
      });
      return CreatedVaga;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Email ja cadastrado');
    }
  }

  async updateVaga(vaga: IVagasEntity): Promise<IVagasEntity> {
    try {
      const UpdatedVaga = await this.prisma.vaga.update({
        where: { id: vaga.id },
        data: {
          id: vaga.id,
          userId: vaga.userId,
          descricao: vaga.descricao,
          formacao: vaga.formacao,
          experiencia: vaga.experiencia,
          stack: vaga.stack,
          nivel: vaga.nivel,
          habilidades: vaga.habilidades,
          contratos: vaga.contratos,
          office: vaga.office,
          deficiencia: vaga.deficiencia,
        },
        include: {
          user: true,
          candidato: true,
        },
      });
      return UpdatedVaga;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteVaga(id: string) {
    try {
      const deletedVaga = await this.prisma.vaga.delete({
        where: { id: id },
      });
      return deletedVaga;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Usuário não encontrado no banco de dados',
      );
    }
  }

  async findAllVagas() {
    try {
      const allVagas = await this.prisma.vaga.findMany({
        include: { user: true, candidato: true },
      });
      return allVagas;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findVagaById(id: string) {
    try {
      const foundVaga = await this.prisma.vaga.findUniqueOrThrow({
        where: { id: id },
        include: { user: true, candidato: true },
      });

      return foundVaga;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
