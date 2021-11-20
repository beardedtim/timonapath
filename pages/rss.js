const trace = require("../utils/trace");
const config = require("../config/static");
const fs = require("fs/promises");
const RSS = require("rss");

const getOrderedPages = (types) => {
  const listOfPages = [];

  for (const [type, pages] of types.entries()) {
    for (const page of pages.values()) {
      listOfPages.push(page);
    }
  }

  const orderedByMetadata = listOfPages.sort((a, b) => {
    if (a.metadata.updated_timestamp > b.metadata.updated_timestamp) {
      return -1;
    }

    if (a.metadata.updated_timestamp < b.metadata.updated_timestamp) {
      return 1;
    }

    return 0;
  });

  return orderedByMetadata;
};
const writeRSSPages = trace(async (types, tags) => {
  // console.log(types, tags)
  console.log("We only want to write a feed of ~20  items");
  const MAX_ITEMS = 20;
  console.log("And we only want the _latest_ 20.");
  const orderdList = getOrderedPages(types, tags).slice(0, MAX_ITEMS);

  const feed = new RSS({
    title: "Tim on a Path",
    description: "The RSS Feed for the Internet Portal of Tim Roberts",
    feed_url: "https://timonapath.com/rss.xml",
    site_url: "https://timonapath.com",
  });

  for (const item of orderdList) {
    feed.item({
      title: item.title,
      url: `https://timonapath.com${item.url}`,
      categories: item.tags,
      date: item.updated_timestamp,
      description: item.summary,
    });
  }

  await fs.writeFile(
    `${config.directories.output}/rss.xml`,
    feed.xml({ indent: true })
  );
}, "Write RSS Pages");

module.exports = {
  url: "/rss",
  template: writeRSSPages,
};
