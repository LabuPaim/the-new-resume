import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { IEmpresaEntity } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresa: EmpresaRepository) {}

  async create(createEmpresaDto: CreateEmpresaDto, id: string) {
    const EmpresaEntity = { ...createEmpresaDto, id: randomUUID() };
    const createdEmpresa = await this.empresa.createEmpresa({
      ...EmpresaEntity,
      userId: id,
    });
    return createdEmpresa;
  }

  async update(updateEmpresaDto: IEmpresaEntity): Promise<IEmpresaEntity> {
    return this.empresa.updateEmpresa(updateEmpresaDto);
  }

  async findAll() {
    return await this.empresa.findAllEmpresa();
  }

  async remove(id: string) {
    return await this.empresa.deleteEmpresa(id);
  }

  async findOne(id: string) {
    return await this.empresa.findEmpresaById(id);
  }
}
