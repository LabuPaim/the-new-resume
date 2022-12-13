import { Candidato, Role } from '@prisma/client';
import { ICandidatoEntity } from 'src/candidato/entities/candidato.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserEntity extends CreateUserDto {
  id: string;  
  role: Role;
  
}
