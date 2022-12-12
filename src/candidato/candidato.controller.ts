import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoService } from './candidato.service';
import { ICandidatoEntity } from './entities/candidato.entity';

@Controller('candidato')
@ApiTags('Candidatos')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @Post()
  async create(
    @Body() createCandidatoDto: ICandidatoEntity,
    @Res() response: Response,
  ) {
    try {
      const result = await this.candidatoService.create(createCandidatoDto);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

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

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const result = await this.candidatoService.findAll();
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.candidatoService.findOne(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

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
