import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common/decorators';
import https from 'https';
import { Request, Response } from 'express';
import Seo from 'src/model/seo';
import { SeoService } from './seo.service';
import axios from 'axios';

@Controller('api/seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Post('')
  create(@Body() seo: Seo) {
    return this.seoService.create(seo);
  }

  @Get('image/*')
  async image(@Param('0') img: string, @Res() res: Response) {
    try {
      const result = await getBase64(fixedEncodeURI(img));

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': result.length,
      });
      res.end(result);
    } catch (e) {}
    res.send();
  }

  @Patch('*')
  crawle(@Param('0') url: string) {
    return this.seoService.crawle(fixedEncodeURI(url));
  }
  @Get()
  get() {
    return this.seoService.get();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.seoService.delete(id);
  }
}
async function getBase64(url) {
  return await axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then((response) => Buffer.from(response.data, 'base64'));
}
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
