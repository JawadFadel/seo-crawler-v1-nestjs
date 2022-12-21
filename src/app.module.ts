import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoController } from './api/seo/seo.controller';
import { SeoModule } from './api/seo/seo.module';
import Seo from './model/seo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/dist'),
      renderPath: '/**',
      exclude: ['api/*'],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'asset/database/seo-db.db',
      synchronize: true,
      entities: [Seo],
    }),
    SeoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
