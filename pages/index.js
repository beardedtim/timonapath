/**
 * Custom pages are 1-off writes that we
 * want to make, given all of the parsed
 * Pages that the system has. They can
 * do _anything_ as long as they return a
 * Promise and cause _some sort_ of HTML
 * to be written to disk.
 */
module.exports.Home = require("./home");
module.exports.Sitemap = require("./sitemap");
module.exports.RSS = require('./rss')

/**
 * This is used to build the generic
 * pages from data sources. Updating
 * these will update _everything_. If
 * you want to update how specific _types_
 * are rendered, go to their types/<type>
 * folder and modify the template.
 */
module.exports.Internal = {
  Leaf: require("./_leaf"),
  List: require("./_list"),
  Type: require("./_type"),
  Page: require("./_page"),
  Utils: require("./_utils"),
};
