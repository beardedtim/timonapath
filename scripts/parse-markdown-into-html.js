const { resolve, extname } = require("path");
const fs = require("fs/promises");
const read = require("./get-files-of-dir-recursively");
const config = require('../config/static.js')
const trace = require("../utils/trace");

const createHomePage = require("../transformers/homepage-to-html");
const createSitemapPage = require('../transformers/sitemap-to-html')
const tagTemplate = require('../transformers/type-into-list-html')

const Types = require("../types");
const Case = require("case");

const rootDir = resolve(__dirname, "..");
const dataDir = resolve(rootDir, "data");
const outputDir = resolve(rootDir, "app");

const inputFileType = "md";
const outputFileType = "html";

const findType = trace((leafPath) => {
  console.log("Leaf: ", leafPath);

  for (const Type of Object.values(Types)) {
    if (leafPath.indexOf(Type.folder) === 0) {
      return Type;
    }
  }
}, "Finding Best Type for Leaf");

const parseLeafAsType = trace(async (type, leafPath) => {
  console.log("Type: ", type);
  console.log("leafPath: ", leafPath);
  const leafRelativePath = leafPath.replace(type.folder, "");

  const { template, metadata } = await type.templates.leaf(leafPath, {
    url: `${type.rootPath}${leafRelativePath.slice(
      0,
      -extname(leafPath).length
    )}`,
    webmentionURL: config.webmentionURL
  });

  const { url } = metadata;

  return {
    template,
    metadata,
    filePath: `${outputDir}/${url}.${outputFileType}`,
    url,
  };
}, "Parse Leaf at Type");

const writeHomePage = trace(async (types, tags) => {
  console.log("Now going to generate the home page.");
  console.log("This will be by taking in the types above");
  console.log("and turning it into links for the homepage to display");

  const homepage = createHomePage({
    links: [...types.keys()].map((type) => ({
      url: type.rootPath,
      title: Case.sentence(type.name),
    })).concat([
      {
        url: '/sitemap',
        title: 'Sitemap'
      }
    ]),
    tags: [...tags.keys()].map(tag => ({
      url: `/tags/${tag}`,
      title: tag
    })),
    meta: {
      webmentionURL: config.webmentionURL
    }
  });

  await fs.writeFile(`${rootDir}/app/index.html`, homepage);
}, "Write Home Page");

const writeSitemapPage = trace(async (types, tags) => {
  console.log("Now we are generating the sitemap page")
  console.log("This will be by taking in the types and tags created")
  console.log("and turning them into groupings of links to their pages")

  const sitemap = {
    groups: new Map(),
  }

  for (const [type, pages] of types.entries()) {
    const urls = [...pages.values()].map(({ url, metadata }) => ({
      url,
      name: metadata.title
    }))

    sitemap.groups.set(type.name, [...urls, { url: type.rootPath, name: type.name }])
  }

  sitemap.groups.set('Tags', [...tags.keys()].map(tag => ({
    url: `https://timonapath.com/tags/${tag}`,
    name: Case.capital(tag)
  })))

  const sitemapPage = createSitemapPage({
    meta: {
      webmentionURL: config.webmentionURL,
      title: 'Sitemap',
    },
    groups: sitemap.groups
  })

  await fs.writeFile(`${rootDir}/app/sitemap.html`, sitemapPage);
  
 }, 'Write Sitemap Page')

const writeLeafPage = trace(async (page) => {
  console.log(`Handling LeafPage: `, page.filePath);

  try {
    console.log("Ensuring path is made");
    await fs.mkdir(`${page.filePath.split("/").slice(0, -1).join("/")}`, {
      recursive: true,
    });
  } catch (e) {
    console.error(e);
    console.log(
      "Error occured while trying to ensure path. Swallowing but may cause issues later. If this does, rethrow"
    );
  }

  console.log("Writing to disk: ", page.filePath);

  await fs.writeFile(page.filePath, page.template);

  console.log("Written to disk: ", page.filePath);
}, "Write Leaf Page");

const writeListPage = trace(async (type, pages) => {
  console.log("Writing List Page for: ", type.toString());
  console.log("Writing List Page");

  const pageList = [...pages.values()];

  const html = type.templates.root({
    links: pageList.map(({ url, metadata }) => ({
      url,
      title: metadata.title,
    })),
    type: type.name,
  });

  await fs.writeFile(`${rootDir}/app/${type.rootPath}/index.html`, html);
}, " Write List Page");

const writeType = trace(async (type, pages) => {
  console.log(`Handling Type::${type.name}`);
  console.log("Type has # Leaf Pages: ", pages.size);

  for (const page of pages.values()) {
    await writeLeafPage(page);
  }

  await writeListPage(type, pages);
}, "Writing Type");

const writePages = trace(async (types) => {
  console.log("Iterating over every Type");

  for (const [type, pages] of types.entries()) {
    await writeType(type, pages);
  }

  console.log("generated all need listing pages.");
}, "Write Pages to Disk");

const buildTypeMap = trace(async (iterator) => {
  const types = new Map();
  for await (const str of iterator) {
    console.log("Leaf Path: ", str);
    const innerType = await findType(str);

    if (!innerType) {
      console.warn(
        "We did not have a type associated with this leaf path. Add a new value to `types/index.js` with a new Type and try this command again."
      );
      continue;
    }

    const page = await parseLeafAsType(innerType, str);

    if (types.has(innerType)) {
      types.set(innerType, types.get(innerType).add(page));
    } else {
      types.set(innerType, new Set([page]));
    }
  }

  return types;
}, "Build Type Map");

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

const writeCustomPages = trace(async (pages, types, tags) => {
  for (const page of pages) {
    await page.template(types, tags);
  }
}, "Write Custom Pages");


const getTagGroup = trace(async (types) => {
  const tags = new Map()

  for (const pages of types.values()) {
    for (const page of pages.values()) {
      if (page.metadata.tags) {
        for (const tag of page.metadata.tags) {
          if (tags.has(tag)) {
            tags.get(tag).add(page)
          } else {
            tags.set(tag, new Set([page]))
          }
        }
      }
    }
  }

  return tags
})

const writeTagPages = trace(async (types) => {
  const tags = await getTagGroup(types)
  
  for (const [tag, pages] of tags.entries()) {
    const template = tagTemplate({
      type: `Tag: ${tag}`,
      links: [...pages.values()].map(({ metadata }) => metadata)
    })

    const path = `${outputDir}/tags/${tag}.html`

    try {
      console.log("Ensuring path is made");
      await fs.mkdir(`${path.split("/").slice(0, -1).join("/")}`, {
        recursive: true,
      });
    } catch (e) {
      console.error(e);
      console.log(
        "Error occured while trying to ensure path. Swallowing but may cause issues later. If this does, rethrow"
      );
    }
    
    await fs.writeFile(path, template)
  }

  return tags

}, 'Write Tag Pages')

const main = trace(async () => {
  console.log("Hello, Tim! Let's build some HTML pages from Markdown!");

  console.log(
    "First, we are going to create an async iterator of all of the files that are in markdown"
  );

  const iterator = await read(dataDir, inputFileType);

  console.log(
    "Now we are going to translate that iterator into a Map<Type,Set<Page>>"
  );

  const seenTypes = await buildTypeMap(iterator);

  console.log("And we are going to go write all of the Set<Page> to disk");

  await writePages(seenTypes);

  console.log("Now we are going to go and create Tag pages that link to all of the Pages that uses the tag")
  const tags = await writeTagPages(seenTypes);

  console.log('Now we are going to write our custom pages')
  await writeCustomPages(customPages, seenTypes, tags);

}, "Parse Markdown Files into HTML");

main();
