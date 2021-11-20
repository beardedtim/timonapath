const { resolve } = require("path");

const rootDir = resolve(__dirname, "..");
const dataDir = resolve(rootDir, "data");
const outputDir = resolve(rootDir, "app");

module.exports = {
  webmentionURL: 'https://timonapath.com/api/webmentions',
  directories: {
    root: rootDir,
    data: dataDir,
    output: outputDir
  }
}