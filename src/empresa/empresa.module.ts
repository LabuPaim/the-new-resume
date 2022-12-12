import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { EmpresaRepository } from './empresa.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [EmpresaController],
  providers: [EmpresaService, EmpresaRepository],
  exports: [EmpresaService],
})
export class EmpresaModule {}
