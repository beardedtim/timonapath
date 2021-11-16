---
title: Create New Type
summary: Doc on how to create a new type within the current system
url: /docs/internal/create-new-type
tags:
  - site docs
---

# How to Create a New Domain

## Overview

This will walk us through how to create a new top-level
path or `domain` for the system.

## Step 0: Create Folder Structure

```sh
mkdir data/my-new-path
```

## Step 1: Create First Entry

```bash
cat >data/my-new-path <<EOL
---
title: My Title
summary: Some Summary
---

# Some Markdown

## Some Other Markdown
EOL
```

## Step 2: Add New Type

### Step 2.1: Add new Type File

```js
// types/my-new-type.js
const path = require('path')
const rootTemplate = require('../transformers/type-into-list-html')
const leafTemplate = require('../transformers/markdown-to-html')
const intoType = require('../transformers/config-into-type')
/**
 * All actions and paths are based off the
 * top level folder path to make it easy to grok
 */
const rootDir = path.resolve(__dirname, '..')

/**
 * Our specific Type has its own path as well
 */
const typeFolder = path.resolve(rootDir, 'data', 'my-new-type')

/**
 * The configuration of the Type that we are constructing
 * 
 * @prop {string} folder The path to the folder for this Type
 * @prop {string} rootPath The path that we want to be served under
 * @prop {{root: function(config): string, leaf: function(config): string }}
 */
const config = {
  folder: typeFolder,
  rootPath: '/my-new-type',
  templates: {
    root: rootTemplate, // Can be custom root template. used for list page
    leaf: leafTemplate // can be custom leaf template. used for leaf page
  },
  name: 'My New Type'
}

module.exports = intoType(config)
```

### Step 2.2: Update Type Map

```js
// types/index.js

module.exports.Docs = require('./docs')
module.exports.Snippets = require('./snippets')
module.exports.Articles = require('./articles')
// add more here
// module.exports.MyNewType = require('./my-new-type)
```