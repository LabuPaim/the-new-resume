import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty()
  @ValidateNested()
  user: User;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @MinLength(14, {
    message: 'CNPJ muito curto, mínimo de 14 dígitos',
  })
  @MaxLength(14, {
    message: 'CNPJ muito longo, máximo de 14 dígitos',
  })
  cnpj: string;

  @ApiProperty()
  @IsString()
  telefone?: string;

  @ApiProperty()
  @IsString()
  cidade?: string;

  @ApiProperty()
  @IsString()
  estado?: string;

  @ApiProperty()
  @IsString()
  descricao?: string;
}
