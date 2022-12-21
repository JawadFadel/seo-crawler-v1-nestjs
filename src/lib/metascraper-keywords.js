'use strict'

/**
 * A set of rules we want to declare under `metascraper-logo` namespace.
 *
**/
module.exports = () => {
  const rules = {
    logo: [
      // They receive as parameter:
      // - `htmlDom`: the cheerio HTML instance.
      // - `url`: The input URL used for extracting the content.
      ({ htmlDom: $, url }) => $('meta[property="keywords"]').attr('content'),
      ({ htmlDom: $, url }) => $('meta[itemprop="keywords"]').attr('content')
    ]
  }
  return rules
}