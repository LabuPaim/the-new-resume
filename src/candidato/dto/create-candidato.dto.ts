import { ApiProperty } from '@nestjs/swagger';
import { Experiencia, Formacao, Links, User, Vaga } from '@prisma/client';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsDataURI,
  IsDate,
  IsEmail,
  IsEnum,
  IsFQDN,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  Contratos,
  Habilidades,
  Nivel,
  Office,
  Stack,
} from 'src/utils/enum/enum';

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
