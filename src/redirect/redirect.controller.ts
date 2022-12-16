import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

@Controller()
@ApiTags('Redirect')
export class RedirectController {
  @Get()
  redirect(@Res() res) {
    try {
      return res.redirect('/api/docs');
    } catch (error) {
      HandleException(error);
    }
  }
}
