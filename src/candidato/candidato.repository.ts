import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { ICandidatoEntity } from './entities/candidato.entity';

@Injectable()
export class CandidatoRepository {
  constructor(private prisma: PrismaService) {}

  async createCandidato(candidato: ICandidatoEntity) {
    try {
      const CreatedCandidato = await this.prisma.candidato.create({
        data: {
          id: candidato.id,
          userId: candidato.userId,
          nome: candidato.nome,
          nascimento: candidato.nascimento,
          cpf: candidato.cpf,
          celular: candidato.celular,
          cidade: candidato.cidade,
          estado: candidato.estado,
          descricao: candidato.descricao,
          stack: candidato.stack,
          nivel: candidato.nivel,
          habilidades: candidato.habilidades,
          contratos: candidato.contratos,
          office: candidato.office,
          deficiencia: candidato.deficiencia,
        },
        include: {
          user: true,
          links: true,
          experiencia: true,
          formacao: true,
        },
      });
      return CreatedCandidato;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Email ja cadastrado');
    }
  }

  async updateCandidato(
    candidato: ICandidatoEntity,
  ): Promise<ICandidatoEntity> {
    try {
      const UpdatedCandidato = await this.prisma.candidato.update({
        where: { id: candidato.id },
        data: {
          userId: candidato.userId,
          nome: candidato.nome,
          nascimento: candidato.nascimento,
          cpf: candidato.cpf,
          celular: candidato.celular,
          cidade: candidato.cidade,
          estado: candidato.estado,
          descricao: candidato.descricao,
          stack: candidato.stack,
          nivel: candidato.nivel,
          habilidades: candidato.habilidades,
          contratos: candidato.contratos,
          office: candidato.office,
          deficiencia: candidato.deficiencia,
        },
        include: {
          user: true,

          links: true,
          experiencia: true,
          formacao: true,
        },
      });
      return UpdatedCandidato;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteCandidato(id: string) {
    try {
      const deletedCandidato = await this.prisma.candidato.delete({
        where: { id: id },
      });
      return deletedCandidato;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Usuário não encontrado no banco de dados',
      );
    }
  }

  async findAllCandidatos() {
    try {
      const allCandidatos = await this.prisma.candidato.findMany({
        include: {
          user: true,

          links: true,
          experiencia: true,
          formacao: true,
        },
      });
      return allCandidatos;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findCandidatoById(id: string) {
    try {
      const foundCandidato = await this.prisma.candidato.findUniqueOrThrow({
        where: { id: id },
        include: {
          user: true,

          links: true,
          experiencia: true,
          formacao: true,
        },
      });

      return foundCandidato;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
