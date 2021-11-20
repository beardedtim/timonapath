const fs = require("fs/promises");

const createHomePage = require("../transformers/homepage-to-html");
const trace = require("../utils/trace");
const config = require('../config/static')
const Case = require('case')

const writeHomePage = trace(async (types, tags) => {
  console.log("Now going to generate the home page.");
  console.log("This will be by taking in the types above");
  console.log("and turning it into links for the homepage to display");

  const homepage = createHomePage({
    links: [...types.keys()].map((type) => ({
      url: type.rootPath,
      title: Case.sentence(type.name),
    })).concat([
      {
        url: '/sitemap',
        title: 'Sitemap'
      }
    ]),
    tags: [...tags.keys()].map(tag => ({
      url: `/tags/${tag}`,
      title: tag
    })),
    meta: {
      webmentionURL: config.webmentionURL
    }
  });

  await fs.writeFile(`${config.directories.output}/index.html`, homepage);

}, "Write Home Page");

module.exports = {
  url: "/",
  template: writeHomePage,
}