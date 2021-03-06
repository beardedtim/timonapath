---
title: Readable Streams in Node
summary: How to create and consume from a readstream
tags:
  - node
  - javascript
---

```ts
// ES Modules / TS

import { Readable } from  'stream'

// CommonJS
const { Readable } = require('stream')

// Creating a new stream
const stream = new Readable()

// Consuming a stream
stream.on('data' buff => {
  // consume buffer
}).on('error', err => {
  // handle error
}).on('done', () => {
  // handle done
})

// pushing to a stream
stream.push('1231')
stream.push('456')
stream.push(null)

// pipe a read stream into a write stream
const writeable = new Writeable()

stream.pipe(writeable)
```
