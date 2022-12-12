import { CreateEmpresaDto } from '../dto/create-empresa.dto';

export interface IEmpresaEntity extends CreateEmpresaDto {
  id: string;
}
