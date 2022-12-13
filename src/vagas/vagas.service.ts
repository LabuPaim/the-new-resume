import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { IVagasEntity } from './entities/vagas.entity';
import { VagasRepository } from './vagas.repository';

@Injectable()
export class VagasService {
  constructor(private readonly vagas: VagasRepository) {}

  async create(createVagaDto: CreateVagasDto, id: string) {
    const VagaEntity = { ...createVagaDto, id: randomUUID() };
    const createdVaga = await this.vagas.createVagas({
      ...VagaEntity,
      userId: id,
    });
    return createdVaga;
  }

  async update(updateVagaDto: IVagasEntity): Promise<IVagasEntity> {
    return this.vagas.updateVaga(updateVagaDto);
  }

  async findAll() {
    return await this.vagas.findAllVagas();
  }

  async remove(id: string) {
    return await this.vagas.deleteVaga(id);
  }

  async findOne(id: string) {
    return await this.vagas.findVagaById(id);
  }
}
