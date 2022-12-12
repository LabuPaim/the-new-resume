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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IsTeacherAuthorization } from 'src/auth/decorators/is-teacher.decorator';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { CandidatoService } from './candidato.service';
import { ICandidatoEntity } from './entities/candidato.entity';

@Controller('candidato')
@ApiTags('Candidatos')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
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

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
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

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
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

  @UseGuards(AuthGuard(), IsTeacherAuthorization)
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
