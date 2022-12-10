import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoRepository } from './candidato.repository';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { ICandidatoEntity } from './entities/candidato.entity';

@Injectable()
export class CandidatoService {
  constructor(private readonly candidato: CandidatoRepository) {}

  async create(createCandidatoDto: CreateCandidatoDto) {
    if (createCandidatoDto.user.role !== 'CANDIDATO') {
      throw new Exception(
        Exceptions.InvalidData,
        'O usuário não é um candidato',
      );
    }
    const candidatoEntity = { ...createCandidatoDto, id: randomUUID() };
    const createdCandidato = await this.candidato.createCandidato(
      candidatoEntity,
    );
    return createdCandidato;
  }

  async update(
    updateCandidatoDto: UpdateCandidatoDto,
  ): Promise<ICandidatoEntity> {
    return this.candidato.updateCandidato(updateCandidatoDto);
  }

  async findAll() {
    return await this.candidato.findAllCandidatos();
  }

  async remove(id: string) {
    return await this.candidato.deleteCandidato(id);
  }

  async findOne(id: string) {
    return await this.candidato.findCandidatoById(id);
  }
}
