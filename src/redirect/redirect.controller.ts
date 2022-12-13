import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Redirect')
export class RedirectController {
  @Get()
  redirect(@Res() res) {
    return res.redirect('/api/docs');
  }
}


