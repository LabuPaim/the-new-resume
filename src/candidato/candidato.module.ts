import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { CandidatoRepository } from './candidato.repository';
import { DatabaseModule } from 'src/prisma/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CandidatoController],
  providers: [CandidatoService, CandidatoRepository],
  exports: [CandidatoService],
})
export class CandidatoModule {}
