import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8, {
    message: 'Senha muito curta, mínimo de 8 dígitos',
  })
  password: string;
}
