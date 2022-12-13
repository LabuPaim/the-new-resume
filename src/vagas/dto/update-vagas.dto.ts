import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateVagasDto } from './create-vagas.dto';

export class UpdateVagasDto extends PartialType(CreateVagasDto) {
  @ApiProperty()
  @IsString()
  id: string;
}
