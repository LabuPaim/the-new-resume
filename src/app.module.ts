import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserRepository } from './users/user.repository';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CandidatoModule } from './candidato/candidato.module';

@Module({
  imports: [DatabaseModule, CandidatoModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class AppModule {}
