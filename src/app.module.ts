import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { CandidatoModule } from './candidato/candidato.module';
import { UsersModule } from './users/users.module';
import { EmpresaModule } from './empresa/empresa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CandidatoModule,
    EmpresaModule,
  ],
})
export class AppModule {}
