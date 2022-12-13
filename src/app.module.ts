import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { CandidatoModule } from './candidato/candidato.module';
import { UsersModule } from './users/users.module';
import { EmpresaModule } from './empresa/empresa.module';
import { AuthModule } from './auth/auth.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CandidatoModule,
    EmpresaModule,
    RedirectModule,
  ],
})
export class AppModule {}
