import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller()
export class RedirectController {
  @Get()
  redirect(@Res() res) {
    return res.redirect('/api/docs');
  }
}


