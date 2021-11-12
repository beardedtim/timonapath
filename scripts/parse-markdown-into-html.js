const { resolve } = require('path')
const fs = require('fs/promises')
const read = require('./get-files-of-dir-recursively')
const transform = require('../transformers/markdown-to-html')
const createSnippetPage = require('../transformers/snippets-into-html')

const rootDir = resolve(__dirname, '..')
const dataDir = resolve(rootDir, 'data')
const outputDir = resolve(rootDir, 'app')

const inputFileType = 'md'
const outputFileType = 'html'

const landingPageTemplates = {
  snippets: createSnippetPage
}

const main = async () => {
  const iterator = await read(dataDir, inputFileType)
  const types = {}

  for await (const str of iterator) {
    // slice 1 because it starts with /
    const inputPath = str.replace(rootDir, '').replace('data', '').slice(1)
    // slice 0 -input.length because we wnt to remove the file type
    const outputPath = outputDir + inputPath.slice(0, -inputFileType.length) + outputFileType
    // slice 0 -output.length - 1 because we want to not have the file extension
    const url = outputPath.replace(outputDir, '').slice(0, -outputFileType.length - 1)


    const { template, metadata } = await transform(str)
    await fs.writeFile(outputPath, template)

    // _ because the first value is empty due to /
    // starting the string
    const [_, type] = inputPath.split('/')

    if (type in types) {
      types[type].push({ url, meta: metadata })
    } else {
      types[type] = [{ url,  meta: metadata}]
    }
  }

  console.log('generated all needed files. Generating landing/listing pages')

  for (const [type, list] of Object.entries(types)) {
    if (landingPageTemplates[type]) {
      await fs.writeFile(`${rootDir}/app/${type}/index.html`, landingPageTemplates[type](list))
    } else {
      console.warn('Cannot create list type for ', type, ' as you never gave me a transformer')
    }
  }

  console.log('generated all need listing pages.')
}

main()