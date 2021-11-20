const { resolve, extname } = require("path");

const read = require("./get-files-of-dir-recursively");
const config = require("../config/static.js");
const trace = require("../utils/trace");

const CustomPages = require("../pages");
const Types = require("../types");
const TypeUtils = require("../types/_utils");

const typeIntoList = require("../transformers/type-into-list-html");

const Tags = require("../tags");

const inputFileType = "md";
const outputFileType = "html";

const write = {
  pages: {
    leaf: CustomPages.Internal.Leaf,
    list: CustomPages.Internal.List,
    custom: CustomPages.Internal.Utils.writeCustomPages,
  },
  tags: Tags.template(typeIntoList),
};

write.type = CustomPages.Internal.Type(write.pages.list, write.pages.leaf);

write.pages.all = CustomPages.Internal.Page(write.type);

const buildTypeMap = TypeUtils.buildTypeMap(
  TypeUtils.findType(Types),
  TypeUtils.parseLeafAsType(outputFileType)
);

const customPages = Object.values(CustomPages);

const main = trace(async () => {
  console.log("Hello, Tim! Let's build some HTML pages from Markdown!");

  console.log(
    "First, we are going to create an async iterator of all of the files that are in markdown"
  );

  const iterator = await read(config.directories.data, inputFileType);

  console.log(
    "Now we are going to translate that iterator into a Map<Type,Set<Page>>"
  );

  const seenTypes = await buildTypeMap(iterator);

  console.log("And we are going to go write all of the Set<Page> to disk");

  await write.pages.all(seenTypes);

  console.log(
    "Now we are going to go and create Tag pages that link to all of the Pages that uses the tag"
  );
  const tags = await write.tags(seenTypes);

  console.log("Now we are going to write our custom pages");
  await write.pages.custom(customPages, seenTypes, tags);
}, "Parse Markdown Files into HTML");

main();
