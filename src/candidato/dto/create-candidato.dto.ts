import { ApiProperty } from '@nestjs/swagger';
import {
  Contratos,
  Experiencia,
  Formacao,
  Habilidades,
  Links,
  Nivel,
  Office,
  Stack,
  User,
  Vaga,
} from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDataURI,
  IsDate,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateCandidatoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @ValidateNested()
  user: User;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsDate()
  nascimento: string;

  @ApiProperty()
  @MinLength(11, {
    message: 'CPF muito curto, mínimo de 11 dígitos',
  })
  @MaxLength(11, {
    message: 'CPF muito longo, máximo de 11 dígitos',
  })
  cpf: string;

  @ApiProperty()
  @IsString()
  celular?: string;

  @ApiProperty()
  @IsString()
  cidade?: string;

  @ApiProperty()
  @IsString()
  estado?: string;

  @ApiProperty()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(Stack)
  stack?: Stack[];

  @ApiProperty()
  @IsEnum(Nivel)
  nivel?: Nivel;

  @ApiProperty()
  @IsArray()
  @IsEnum(Habilidades)
  habilidades?: Habilidades[];

  @ApiProperty()
  @IsArray()
  @IsEnum(Contratos)
  contratos?: Contratos[];

  @ApiProperty()
  @IsArray()
  @IsEnum(Office)
  office?: Office[];

  @ApiProperty()
  @IsBoolean()
  deficiencia?: boolean;

  @ApiProperty()
  @IsArray()
  vaga?: Vaga[];

  @ApiProperty()
  @IsArray()
  @IsDataURI()
  links?: Links[];

  @ApiProperty()
  @IsArray()
  experiencia?: Experiencia[];

  @ApiProperty()
  @IsArray()
  formacao?: Formacao[];
}
