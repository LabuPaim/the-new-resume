import { Stack } from '@prisma/client';
import { CreateCandidatoDto } from '../dto/create-candidato.dto';

export interface ICandidatoEntity extends CreateCandidatoDto {
  id: string;
  userId: string;
  stack?: Stack[];
}
