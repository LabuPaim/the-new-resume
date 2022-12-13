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
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IsUserAuthorization } from 'src/auth/decorators/is-teacher.decorator';

@Controller('users')
@ApiTags('Users')
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

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Body() UpdateUser: IUserEntity,
    @userLogged() user: IUserEntity,
  ) {
    try {
      if (UpdateUser.id) {
        delete UpdateUser.id;
      }
      const result = { ...UpdateUser, id: user.id };
      return await this.usersService.update(result);
    } catch (error) {
      HandleException(error);
    }
  }

  @UseGuards(AuthGuard(), IsUserAuthorization)
  @ApiBearerAuth()
  @Get()
  async findAll(@Res() response: Response, @userLogged() user: IUserEntity) {
    try {
      return response.status(200).send(user);
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

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
