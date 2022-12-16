import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { IVagasEntity } from './entities/vagas.entity';
import { VagasRepository } from './vagas.repository';

@Injectable()
export class VagasService {
  constructor(private readonly vagas: VagasRepository) {}

  async create(createVagaDto: CreateVagasDto, id: string) {
    try {
      const VagaEntity = { ...createVagaDto, id: randomUUID() };
      const createdVaga = await this.vagas.createVagas({
        ...VagaEntity,
        userId: id,
      });
      return createdVaga;
    } catch (error) {
      HandleException(error);
    }
  }

  async update(updateVagaDto: IVagasEntity): Promise<IVagasEntity> {
    try {
      return this.vagas.updateVaga(updateVagaDto);
    } catch (error) {
      HandleException(error);
    }
  }

  async findAll() {
    try {
      return await this.vagas.findAllVagas();
    } catch (error) {
      HandleException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.vagas.deleteVaga(id);
    } catch (error) {
      HandleException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.vagas.findVagaById(id);
    } catch (error) {
      HandleException(error);
    }
  }
}
