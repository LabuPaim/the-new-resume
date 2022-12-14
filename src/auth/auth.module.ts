import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/prisma/database.module';
import { UserRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' }
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserRepository, AuthStrategy],
  exports: [AuthStrategy, AuthService],
})
export class AuthModule {}
