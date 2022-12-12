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
import { ApiTags } from '@nestjs/swagger';

@Controller('empresa')
@ApiTags('Empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

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

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const result = await this.empresaService.findAll();
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.empresaService.findOne(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

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
