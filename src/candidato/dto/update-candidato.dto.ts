import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCandidatoDto } from './create-candidato.dto';

export class UpdateCandidatoDto extends PartialType(CreateCandidatoDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
