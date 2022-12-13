import { Contratos, Experiencia, Formacao, Habilidades, Links, Office, Stack, Vaga } from '@prisma/client';
import { CreateCandidatoDto } from '../dto/create-candidato.dto';

export interface ICandidatoEntity extends CreateCandidatoDto {
  id: string;
  userId: string;
  office?: Office[];
  contratos?: Contratos[];
  habilidades?: Habilidades[];

  stack?: Stack[];
  links?: Links[];
  experiencia?: Experiencia[];
  formacao?: Formacao[];
}
