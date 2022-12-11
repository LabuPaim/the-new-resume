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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: IUserEntity, @Res() response: Response) {
    try {
      const result = await this.usersService.create(createUserDto);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Patch(':id')
  async update(@Body() UpdateUser: IUserEntity, @Param('id') id: string) {
    try {
      const result = { ...UpdateUser, id: id };
      return await this.usersService.update(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const result = await this.usersService.findAll();
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.usersService.findOne(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.usersService.remove(id);
      return response.status(200).send(result);
    } catch (error) {
      HandleException(error);
    }
  }
}
