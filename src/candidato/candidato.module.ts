import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { CandidatoRepository } from './candidato.repository';
import { DatabaseModule } from 'src/prisma/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CandidatoController],
  providers: [CandidatoService, CandidatoRepository],
  exports: [CandidatoService],
})
export class CandidatoModule {}
