import { Candidato, Habilidades } from '@prisma/client';
import { CreateVagasDto } from '../dto/create-vagas.dto';

export interface IVagasEntity extends CreateVagasDto {
  id: string;
  userId: string;

  // formacao?: string[];
  // experiencia?: string[];

  candidato?: Candidato[];
  habilidades?: Habilidades[];
}
