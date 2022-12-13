import { Module } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { VagasController } from './vagas.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { PassportModule } from '@nestjs/passport';
import { VagasRepository } from './vagas.repository';

@Module({
  imports: [DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [VagasController],
  providers: [VagasService, VagasRepository],
  exports: [VagasService],
})
export class VagasModule {}
