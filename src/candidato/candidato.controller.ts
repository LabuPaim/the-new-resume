import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Response } from 'express';
import { IsUserAuthorization } from 'src/auth/decorators/is-teacher.decorator';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IUserEntity } from 'src/users/entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoService } from './candidato.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { ICandidatoEntity } from './entities/candidato.entity';

@Controller('candidato')
@ApiTags('Candidatos')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(
    @userLogged() user: IUserEntity,
    @Body() createCandidatoDto: CreateCandidatoDto,
    @Res() response: Response,
  ) {
    try {
      if (createCandidatoDto.user.id === user.id) {
        if (user.role == Role.candidato) {
          const result = await this.candidatoService.create(
            createCandidatoDto,
            user.id,
          );
          return response.status(200).send(result);
        } else {
          return { mensagem: 'O usuário não é um dandidato' };
        }
      } else {
        return { mensagem: 'O usuário só pode ter apenas um perfil' };
      }
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Body() updateCandidatoDto: ICandidatoEntity,
    @Param('id') id: string,
  ) {
    try {
      const result = { ...updateCandidatoDto, id: id };
      return await this.candidatoService.update(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll(@Res() response: Response) {
    try {
      const result = await this.candidatoService.findAll();
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.candidatoService.findOne(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.candidatoService.remove(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }
}
