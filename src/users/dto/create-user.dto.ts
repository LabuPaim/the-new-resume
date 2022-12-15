import { ApiProperty } from '@nestjs/swagger';
import { Candidato, Empresa, Role, Vaga } from '@prisma/client';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsAlphanumeric()
  @ApiProperty()
  password: string;

  role: Role
}
