import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { IEmpresaEntity } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresa: EmpresaRepository) {}

  async create(createEmpresaDto: CreateEmpresaDto, id: string) {
    try {
      const EmpresaEntity = { ...createEmpresaDto, id: randomUUID() };
      const createdEmpresa = await this.empresa.createEmpresa({
        ...EmpresaEntity,
        userId: id,
      });
      return createdEmpresa;
    } catch (error) {
      HandleException(error);
    }
  }

  async update(updateEmpresaDto: IEmpresaEntity): Promise<IEmpresaEntity> {
    try {
      return this.empresa.updateEmpresa(updateEmpresaDto);
    } catch (error) {
      HandleException(error);
    }
  }

  async findAll() {
    try {
      return await this.empresa.findAllEmpresa();
    } catch (error) {
      HandleException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.empresa.deleteEmpresa(id);
    } catch (error) {
      HandleException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.empresa.findEmpresaById(id);
    } catch (error) {
      HandleException(error);
    }
  }
}
