import { CreateCandidatoDto } from '../dto/create-candidato.dto';

export interface ICandidatoEntity extends CreateCandidatoDto {
  id: string;
}
