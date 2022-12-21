import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Seo from 'src/model/seo';
import { DeleteResult, Repository } from 'typeorm';
import { html, load } from 'cheerio';
import axios from 'axios';
const getHTML = require('html-get');
const browserless = require('browserless')();

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-lang')(),
  require('metascraper-feed')(),
  require('metascraper-media-provider')(),
  require('metascraper-video')(),
  require('metascraper-readability')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-address')(),
]);

const getContent = async (url) => {
  // create a browser context inside the main Chromium process
  const browserContext = browserless.createContext();
  const promise = getHTML(url, { getBrowserless: () => browserContext });
  // close browser resources before return the result

  promise
    .then(() => browserContext)
    .then((browser) => browser.destroyContext());
  return promise;
};

@Injectable()
export class SeoService {
  image(img: string) {
    return axios.get(img, { responseType: 'stream' }).then((response) => {
      return response.data;
    });
  }
  constructor(
    @InjectRepository(Seo)
    private readonly seoRepository: Repository<Seo>,
  ) {}
  public async create(seo: Seo) {
    return await this.seoRepository.save(this.seoRepository.create(seo));
  }

  public async crawle(url: string) {
    if (!validURL(url)) throw new HttpException('Error', 400);

    try {
      var s = getContent(url);

      var r = await (await fetch(url)).text();
      var result: Seo = await s
        .then((res) => {
          return res;
        })
        .then(metascraper);
      var $ = load(r);

      var keywords = $('meta[name="keywords"]').attr('content');
      var topics = $('meta[name="topics"]').attr('content');
      var author = $('meta[name="author"]').attr('content');

      result.topics = topics ? topics.replace(/, /g, ',') : '';
      result.author = author ?? '';
      result.keywords = keywords ? keywords.replace(/, /g, ',') : '';
      return result;
    } catch (error) {
      throw new HttpException('ERROR', 400);
    }
  }

  public async delete(id: number): Promise<DeleteResult> {
    var f = await this.seoRepository.delete(id);
    return f;
  }
  public async update(id: number, seo: Seo): Promise<DeleteResult> {
    var f = await this.seoRepository.update(id, seo);
    return f;
  }

  public async get(): Promise<Seo[]> {
    return this.seoRepository.find({
      order: {
        id: -1,
      },
    });
  }
}
function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}
