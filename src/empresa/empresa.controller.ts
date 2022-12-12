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

@Controller('empresa')
@ApiTags('Empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createEmpresaDto: IEmpresaEntity,
    @Res() response: Response,
  ) {
    try {
      const result = await this.empresaService.create(createEmpresaDto);
      return response.status(200).send(result);
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
  async findAll(@Res() response: Response) {
    try {
      const result = await this.empresaService.findAll();
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
