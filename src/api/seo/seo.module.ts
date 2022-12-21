import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Seo from 'src/model/seo';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seo])],
  controllers: [SeoController],
  providers: [SeoService],
})
export class SeoModule {}
