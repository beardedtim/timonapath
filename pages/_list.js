const config = require('../config/static')
const fs = require('fs/promises')
const trace = require('../utils/trace')

const writeListPage = trace(async (type, pages) => {
  console.log("Writing List Page for: ", type.toString());
  console.log("Writing List Page");
  const pageList = [...pages.values()];

  const html = type.templates.root({
    links: pageList.map(({ url, metadata }) => ({
      url,
      title: metadata.title,
    })),
    type: type.name,
  });

  await fs.writeFile(`${config.directories.output}/${type.rootPath}/index.html`, html);
}, " Write List Page");

module.exports = writeListPage