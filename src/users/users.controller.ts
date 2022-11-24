import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserEntity> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<IUserEntity> {
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
