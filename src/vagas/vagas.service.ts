import { Injectable } from '@nestjs/common';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { UpdateVagasDto } from './dto/update-vagas.dto';

@Injectable()
export class VagasService {
  create(createVagasDto: CreateVagasDto) {
    return 'This action adds a new vagas';
  }

  findAll() {
    return `This action returns all vagas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vagas`;
  }

  update(id: number, updateVagasDto: UpdateVagasDto) {
    return `This action updates a #${id} vagas`;
  }

  remove(id: number) {
    return `This action removes a #${id} vagas`;
  }
}
