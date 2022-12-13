import { Candidato, Empresa, Habilidades } from '@prisma/client';
import { CreateVagasDto } from '../dto/create-vagas.dto';

export interface IVagasEntity extends CreateVagasDto {
  id: string;
  userId: string;

  // formacao?: string[];
  // experiencia?: string[];

  candidato?: Candidato[];
  empresa?: Empresa[];
  habilidades?: Habilidades[];
}
