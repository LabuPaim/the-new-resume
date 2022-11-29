import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { Exception } from './IException';

export enum Exceptions {
  InvalidData,
  DatabaseException,
  NotFoundData,
  UnauthorizedException,
}

export function HandleException({ message, exception }: Exception) {
  if (
    exception === Exceptions.InvalidData
  ) {
    throw new BadRequestException(message ? message : 'Invalid data');
  }
  if (exception === Exceptions.DatabaseException) {
    throw new InternalServerErrorException(
      message ? message : 'Error in database',
    );
  }
  if (exception === Exceptions.UnauthorizedException) {
    throw new UnauthorizedException(
      message ? message : 'You not have permissions to make this action',
    );
  }
  if (exception === Exceptions.NotFoundData) {
    throw new NotFoundException(
      message ? message : 'Usuário não encontrado',
    );
  }
}
