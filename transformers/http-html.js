const fetch = require('node-fetch')
const cheerio = require('cheerio')

const parseLinkHeader = (linkHeader = '') => linkHeader.split(',').map(part => {
  const [url, relUnparsed = ''] = part.split(';')
  const rel = relUnparsed && JSON.parse(relUnparsed.replace(' rel=', ''))

  return {
    url: url.trim(),
    rel
  }
})

const readPage = url => fetch(url).then(async x => ({
  headers: {
    links: parseLinkHeader(x.headers.get('link') || ''),
  },
  status: x.status,
  statusText: x.statusText,
  body: await x.text()
}))

const parsePage = (page) => ({
  ...page,
  $: cheerio.load(page.body)
})

module.exports = url => readPage(url).then(parsePage)