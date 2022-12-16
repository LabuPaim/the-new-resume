import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoRepository } from './candidato.repository';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { ICandidatoEntity } from './entities/candidato.entity';

@Injectable()
export class CandidatoService {
  constructor(private readonly candidato: CandidatoRepository) {}

  async create(createCandidatoDto: CreateCandidatoDto, id: string) {
    try {
      const candidatoEntity = { ...createCandidatoDto, id: randomUUID() };
      const createdCandidato = await this.candidato.createCandidato({
        ...candidatoEntity,
        userId: id,
      });
      return createdCandidato;
    } catch (error) {
      HandleException(error);
    }
  }

  async update(
    updateCandidatoDto: ICandidatoEntity,
  ): Promise<ICandidatoEntity> {
    try {
      return this.candidato.updateCandidato(updateCandidatoDto);
    } catch (error) {
      HandleException(error);
    }
  }

  async findAll() {
    try {
      return await this.candidato.findAllCandidatos();
    } catch (error) {
      HandleException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.candidato.deleteCandidato(id);
    } catch (error) {
      HandleException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.candidato.findCandidatoById(id);
    } catch (error) {
      HandleException(error);
    }
  }
}
