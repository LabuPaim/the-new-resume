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
import { EmpresaService } from './empresa.service';
import { IEmpresaEntity } from './entities/empresa.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { IsUserAuthorization } from 'src/auth/decorators/is-teacher.decorator';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IUserEntity } from 'src/users/entities/user.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { Role } from '@prisma/client';

@Controller('empresa')
@ApiTags('Empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(
    @userLogged() user: IUserEntity,
    @Body() createEmpresaDto: CreateEmpresaDto,
    @Res() response: Response,
  ) {
    try {
      if (user.role === Role.empresa) {
        const existe = [null, undefined];
        if (existe.includes(user.empresa[0])) {
          console.log("controller")
          const result = await this.empresaService.create(
            createEmpresaDto,
            user.id,
          );
          return response.status(200).send(result);
        } else {
          return response
            .status(201)
            .send({ mensagem: 'O usuário só pode ter apenas um perfil' });
        }
      } else {
        return response
          .status(201)
          .send({ mensagem: 'O usuário não é uma empresa' });
      }
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Body() createEmpresaDto: IEmpresaEntity,
    @Param('id') id: string,
  ) {
    try {
      const result = { ...createEmpresaDto, id: id };
      return await this.empresaService.update(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll(@Res() response: Response, @userLogged() user: IUserEntity) {
    try {
      
      return response.status(200).send(user.empresa);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.empresaService.findOne(id);
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
      const result = await this.empresaService.remove(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }
}
