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
import { IsString, ValidateNested } from 'class-validator';

export class CreateVagasDto {
  @ApiProperty()
  @ValidateNested()
  user: Empresa;

  @ApiProperty()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsString()
  formacao: string[];

  @ApiProperty()
  @IsString()
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
