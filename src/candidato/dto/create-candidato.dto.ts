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
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateCandidatoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  nascimento: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(11, {
    message: 'CPF muito curto, mínimo de 11 dígitos',
  })
  @MaxLength(11, {
    message: 'CPF muito longo, máximo de 11 dígitos',
  })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  celular: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Stack)
  stack: Stack[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Nivel)
  nivel: Nivel;

  @ApiProperty()
  @IsArray()
  @IsEnum(Habilidades)
  habilidades?: Habilidades[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Contratos)
  contratos: Contratos[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsEnum(Office)
  office: Office[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  deficiencia: boolean;

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
