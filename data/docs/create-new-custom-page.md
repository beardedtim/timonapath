---
title: Create New Custom Page
summary: |
  Doc on how to create a new custom page to be built at runtime using the
  types and tags
url: /docs/internal/create-new-custom-page
tags:
  - site docs
---

# How to Create a New Custom Page

## Step 0: Stub Out Page

Inside of `scripts/parse-markdown-into-html.js`, there is a block defining `customPages`:

```js
const customPages = [
  {
    url: "/",
    template: writeHomePage,
  },
  {
    url: "/sitemap",
    template: writeSitemapPage
  }
];

```

Add a new object to the `customPages` array that describes your new page along with a new template
file:

```js
/** ... */
const writeAboutPage = trace(async (types, tags) => {
  console.log('Stubbed for now!')
}, 'Write About Page')

/** ... */
const customPages = [
  /** ... */
  {
    url: '/about',
    template: writeAboutPage
  }
];

```

Now go back and implement however you want to create the About page and save it to the
correct location on the filesystem.