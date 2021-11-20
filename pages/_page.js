const trace = require("../utils/trace");

const writePages = (writeType) =>
  trace(async (types) => {
    console.log("Iterating over every Type");

    for (const [type, pages] of types.entries()) {
      await writeType(type, pages);
    }

    console.log("generated all need listing pages.");
  }, "Write Pages to Disk");

module.exports = writePages;
