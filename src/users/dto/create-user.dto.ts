import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

  // candidato: Candidato[];
  // empresa: Empresa[];
}

// enum Role {
//   CANDIDATO,
//   EMPRESA,
// }

// class Candidato {
//   userId: string;
//   user: CreateUserDto;
//   nome: string;
//   nascimento: Date;
//   cpf: String;
//   celular: String;
//   cidade: String;
//   estado: String;
//   descricao?: String;
//   // stack:       Stack[]
//   // nivel:       Nivel
//   // habilidades: Habilidades[]
//   // contratos:   Contratos[]
//   // office:      Office[]
//   // deficiencia: Boolean
//   // vaga:        Vaga[]
//   // links:       Links[]
//   // experiencia: Experiencia[]
//   // formacao:    Formacao[]
// }

// class Empresa {
//   userId: String;
//   user: CreateUserDto;
//   nome: String;
//   cnpj: String;
//   telefone: String;
//   descricao?: String;
//   cidade: String;
//   estado: String;
//   // vaga:      Vaga[]
//   // links:     Links[]
// }
