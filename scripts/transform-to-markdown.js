const path = require('path')
const markdownToHTML = require('../transformers/markdown-to-html')

const MARKDOWN_PATH = path.resolve(__dirname, '..', 'data', 'snippets', 'node', 'readstream.md')
const HTML_PATH = path.resolve(__dirname, '..', 'app', 'snippets','node', 'readstream.html')

const main = async () => {
  await markdownToHTML(MARKDOWN_PATH, HTML_PATH)
}

main()