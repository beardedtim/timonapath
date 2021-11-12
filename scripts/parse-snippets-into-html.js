const { resolve } = require('path')
const read = require('./get-files-of-dir-recursively')
const transform = require('../transformers/markdown-to-html')

const rootDir = resolve(__dirname, '..')
const dataDir = resolve(rootDir, 'data')
const outputDir = resolve(rootDir, 'app')

const inputFileType = 'md'
const outputFileType = 'html'

const main = async () => {
  const iterator = await read(dataDir, inputFileType)
  
  for await (const str of iterator) {
    const inputPath = str.replace(rootDir, '').replace('data', '')
    const outputPath = outputDir + inputPath.slice(1).slice(0, -inputFileType.length) + outputFileType

    await transform(str, outputPath)
  }

  console.log('done')
}

main()