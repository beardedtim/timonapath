---
title: Create Async Iterator
summary: How to create an Async Iterator
tags:
  - node
  - javascript
---

```ts
// This will go on forever and ever,
// emitting larger and larger values until
// we stop pulling from the iterator or it
// runs out of space
const iterator = {
  [Symbol.asyncIterator]: async function* () {
    let count = 0;

    while (true) {
      yield count++;
    }
  },
};

for await (const number of iterator) {
  console.log(number); // 1, then 2, then 3, then ...
}

// using a library

const { Lazy, operators } = require("@beardedtim/lazy");

const iter = new Lazy(async function* () {
  let count = 0;
  while (true) {
    yield count++;
  }
});

const double = operators.map((num) => num * 2);
const skip10 = operators.skip(10);
const take5 = operators.take(5);

const transform = operators.compose(double, take5, skip10);

for await (const value of transform(iter)) {
  console.log(value); // 22, ...
}
```
