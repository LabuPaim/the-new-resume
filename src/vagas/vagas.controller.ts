import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { VagasService } from './vagas.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/users/entities/user.entity';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IsUserAuthorization } from 'src/auth/decorators/is-teacher.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { Role } from '@prisma/client';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IVagasEntity } from './entities/vagas.entity';
import { Response } from 'express';

@Controller('vagas')
@ApiTags('Vagas')
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(
    @userLogged() user: IUserEntity,
    @Body() createVagasDto: CreateVagasDto,
    @Res() response: Response,
  ) {
    try {
      if (user.role === Role.empresa) {
        if ('empresa' in user) {
          const result = await this.vagasService.create(
            createVagasDto,
            user.id,
          );
          return response.status(200).send(result);
        } else {
          return response
            .status(201)
            .send({ mensagem: 'O usuário ainda não tem um perfil' });
        }
      } else {
        return response.status(201).send({
          mensagem: 'O usuário não tem permissão para criar uma vaga',
        });
      }
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Body() updateVagaDto: IVagasEntity, @Param('id') id: string) {
    try {
      const result = { ...updateVagaDto, id: id };
      return await this.vagasService.update(result);
    } catch (error) {
      HandleException(error);
    }
  }

  // @UseGuards(AuthGuard(), IsUserAuthorization)
  // @ApiBearerAuth()
  @Get()
  async findAll(
    @Res() response: Response,
    //  @userLogged()
    user: IUserEntity,
  ) {
    try {
      return response.status(200).send(user.vaga);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.vagasService.findOne(id);
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
      const result = await this.vagasService.remove(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }
}
