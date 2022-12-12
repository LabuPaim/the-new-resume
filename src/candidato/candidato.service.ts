import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CandidatoRepository } from './candidato.repository';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { ICandidatoEntity } from './entities/candidato.entity';

@Injectable()
export class CandidatoService {
  constructor(private readonly candidato: CandidatoRepository) {}

  async create(createCandidatoDto: CreateCandidatoDto, id: string) {
    const candidatoEntity = { ...createCandidatoDto, id: randomUUID() };
    const createdCandidato = await this.candidato.createCandidato({
      ...candidatoEntity,
      userId: id,
    });
    return createdCandidato;
  }

  async update(
    updateCandidatoDto: ICandidatoEntity,
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
