import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCandidatoDto } from './create-candidato.dto';

export class UpdateCandidatoDto extends PartialType(CreateCandidatoDto) {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
