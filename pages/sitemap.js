const fs = require("fs/promises");

const createSitemapPage = require("../transformers/sitemap-to-html");
const createSitemapXML = require('../transformers/sitemap-to-xml')

const trace = require("../utils/trace");
const config = require('../config/static')
const Case = require('case')

const writeSitemapPage = trace(async (types, tags) => {
  console.log("Now we are generating the sitemap page")
  console.log("This will be by taking in the types and tags created")
  console.log("and turning them into groupings of links to their pages")

  const sitemap = {
    groups: new Map(),
  }

  for (const [type, pages] of types.entries()) {
    const urls = [...pages.values()].map(({ url, metadata }) => ({
      url,
      name: metadata.title
    }))

    sitemap.groups.set(type.name, [...urls, { url: type.rootPath, name: type.name }])
  }

  sitemap.groups.set('Tags', [...tags.keys()].map(tag => ({
    url: `https://timonapath.com/tags/${tag}`,
    name: Case.capital(tag)
  })))

  const sitemapPage = createSitemapPage({
    meta: {
      webmentionURL: config.webmentionURL,
      title: 'Sitemap',
    },
    groups: sitemap.groups
  })

  await fs.writeFile(`${config.directories.output}/sitemap.html`, sitemapPage);
  
  const sitemapXML = createSitemapXML({
    groups: sitemap.groups
  })

  await fs.writeFile(`${config.directories.output}/sitemap.xml`, sitemapXML)

 }, 'Write Sitemap Page')
 
 module.exports = {
   url: '/sitemap',
   template: writeSitemapPage
 }