import { Role } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserEntity extends CreateUserDto {
  id: string;
  
  role: Role;
}
