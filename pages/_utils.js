const trace = require("../utils/trace");

const writeCustomPages = trace(async (pages, types, tags) => {
  for (const page of pages) {
    page.template && (await page.template(types, tags));
  }
}, "Write Custom Pages");

module.exports.writeCustomPages = writeCustomPages;
