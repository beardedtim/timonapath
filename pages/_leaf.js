const trace = require('../utils/trace')
const fs = require('fs/promises')

const writeLeafPage = trace(async (page) => {
  console.log(`Handling LeafPage: `, page.filePath);

  try {
    console.log("Ensuring path is made");
    await fs.mkdir(`${page.filePath.split("/").slice(0, -1).join("/")}`, {
      recursive: true,
    });
  } catch (e) {
    console.error(e);
    console.log(
      "Error occured while trying to ensure path. Swallowing but may cause issues later. If this does, rethrow"
    );
  }

  console.log("Writing to disk: ", page.filePath);

  await fs.writeFile(page.filePath, page.template);

  console.log("Written to disk: ", page.filePath);
}, "Write Leaf Page");

module.exports = writeLeafPage