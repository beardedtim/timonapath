const path = require('path')
const rootTemplate = require('../transformers/type-into-list-html')
const leafTemplate = require('../transformers/replies-to-html')
const intoType = require('../transformers/config-into-type')

/**
 * All actions and paths are based off the
 * top level folder path to make it easy to grok
 */
const rootDir = path.resolve(__dirname, '..')

/**
 * Our specific Type has its own path as well
 */
const typeFolder = path.resolve(rootDir, 'data', 'replies')

/**
 * The configuration of the Type that we are constructing
 * 
 * @prop {string} folder The path to the folder for this Type
 * @prop {string} rootPath The path that we want to be served under
 * @prop {{root: function(config): string, leaf: function(config): string }}
 */
const config = {
  folder: typeFolder,
  rootPath: '/replies',
  templates: {
    root: rootTemplate,
    leaf: leafTemplate
  },
  name: 'Replies'
}

module.exports = intoType(config)