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
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoService } from './candidato.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';

@Controller('candidato')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @Post()
  async create(
    @Body() createCandidatoDto: CreateCandidatoDto,
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
    @Body() updateCandidatoDto: UpdateCandidatoDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.candidatoService.update(updateCandidatoDto);
      return response.status(200).send(result);
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
