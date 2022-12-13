import { ApiProperty } from '@nestjs/swagger';
import {
  Bool,
  Candidato,
  Contratos,
  Empresa,
  Habilidades,
  Nivel,
  Office,
  Stack,
} from '@prisma/client';
import { IsEnum, ValidateNested } from 'class-validator';

export class CreateVagasDto {
  @ApiProperty()
  @ValidateNested()
  user: Empresa;

  // candidato: Candidato;

  @ApiProperty()
  descricao?: string;

  @ApiProperty()
  formacao?: string[];

  @ApiProperty()
  experiencia?: string[];

  @ApiProperty()
  @IsEnum(Stack)
  stack: Stack;

  @ApiProperty()
  @IsEnum(Nivel)
  nivel: Nivel;

  @ApiProperty()
  @IsEnum(Contratos)
  contratos: Contratos;

  @ApiProperty()
  @IsEnum(Office)
  office: Office;

  @ApiProperty()
  @IsEnum(Bool)
  deficiencia: Bool;
}
