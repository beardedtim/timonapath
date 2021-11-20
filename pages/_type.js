const trace = require('../utils/trace')

const writeType = (list, leaf) => trace(async (type, pages) => {
  console.log(`Handling Type::${type.name}`);
  console.log("Type has # Leaf Pages: ", pages.size);

  for (const page of pages.values()) {
    await leaf(page);
  }

  await list(type, pages);
}, "Writing Type");

module.exports = writeType