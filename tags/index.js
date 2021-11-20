const trace = require("../utils/trace");
const fs = require("fs/promises");
const config = require("../config/static");

const getTagGroup = trace(async (types) => {
  const tags = new Map();

  for (const pages of types.values()) {
    for (const page of pages.values()) {
      if (page.metadata.tags) {
        for (const tag of page.metadata.tags) {
          if (tags.has(tag)) {
            tags.get(tag).add(page);
          } else {
            tags.set(tag, new Set([page]));
          }
        }
      }
    }
  }

  return tags;
}, "Getting Tag Groups");

const writeTagsPage = (tagTemplate) =>
  trace(async (types) => {
    const tags = await getTagGroup(types);

    for (const [tag, pages] of tags.entries()) {
      const template = tagTemplate({
        type: `Tag: ${tag}`,
        links: [...pages.values()].map(({ metadata }) => metadata),
      });

      const path = `${config.directories.output}/tags/${tag}.html`;

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

      await fs.writeFile(path, template);
    }

    return tags;
  }, "Write Tag Pages");

module.exports = {
  template: writeTagsPage,
};
