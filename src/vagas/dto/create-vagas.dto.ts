import { ApiProperty } from '@nestjs/swagger';
import {
  Bool,
  Contratos,
  Empresa,
  Habilidades,
  Nivel,
  Office,
  Stack,
} from '@prisma/client';
import { ValidateNested } from 'class-validator';

export class CreateVagasDto {
  @ApiProperty()
  @ValidateNested()
  user: Empresa;
  
  @ApiProperty()
  formacao: string[];

  @ApiProperty()
  descricao?: string;

  @ApiProperty()
  experiencia: string[];

  @ApiProperty()
  stack: Stack;

  @ApiProperty()
  nivel: Nivel;

  @ApiProperty()
  habilidades?: Habilidades[];

  @ApiProperty()
  contratos: Contratos;

  @ApiProperty()
  office: Office;

  @ApiProperty()
  deficiencia: Bool;
}
