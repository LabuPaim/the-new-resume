import { Candidato, Empresa, Role, Vaga } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserEntity extends CreateUserDto {
  id: string;
  role: Role;

  candidato: Candidato[];
  empresa: Empresa[];
  vaga: Vaga[];
}
