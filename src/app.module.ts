import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserRepository } from './users/user.repository';
import { CandidatoModule } from './candidato/candidato.module';
import { CandidatoController } from './candidato/candidato.controller';
import { CandidatoService } from './candidato/candidato.service';
import { CandidatoRepository } from './candidato/candidato.repository';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, CandidatoModule],
})
export class AppModule {}
