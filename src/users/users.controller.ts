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
import { IUserEntity } from './entities/user.entity';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      // console.log('Deu try');
      const result = await this.usersService.create(createUserDto);
      return response.status(200).send(result);
      // response.status(201).send(result);
    } catch (error) {
      // console.log('Deu erro');
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Body() updateUserDto: UpdateUserDto): Promise<IUserEntity> {
    console.log('Updating');
    try {
      return await this.usersService.update(updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(): Promise<IUserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
