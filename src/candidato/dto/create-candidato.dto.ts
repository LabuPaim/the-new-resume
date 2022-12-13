import { ApiProperty } from '@nestjs/swagger';
import {
  Nivel,
  User,
} from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateCandidatoDto {

  @ApiProperty()
  @ValidateNested()
  user: User;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
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
  @IsEnum(Nivel)
  nivel?: Nivel;  

  @ApiProperty()
  @IsBoolean()
  deficiencia?: boolean;

 
}
