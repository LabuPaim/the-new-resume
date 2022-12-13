import { Links, Vaga } from '@prisma/client';
import { CreateEmpresaDto } from '../dto/create-empresa.dto';

export interface IEmpresaEntity extends CreateEmpresaDto {
  id: string;
  links?: Links[];
  vaga?: Vaga[];
  userId: string;
}
