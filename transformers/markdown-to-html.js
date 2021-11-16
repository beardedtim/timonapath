const MarkdownIt = require("markdown-it");
const fss = require("fs/promises");
const hljs = require("highlight.js");
const meta = require("markdown-it-front-matter");
const webmentions = require('./meta-into-webmentions-script')
const headHTML = require('./meta-into-head-html')
const { format: formatDate } = require("date-fns");

const yaml = require('yaml');

const defaultTemplate = (meta, data) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">

${headHTML({
  ...meta,
  css: `
    <link rel="stylesheet" src="/css/leaf.css" />
  `
})}

<body>
  <article class="h-entry">
    <header>
      <a href="https://timonapath.com${meta.url}" class="u-url">
        <h2 class="p-name">${meta.title}</h2>
      </a>
      <p>Published by <a class="p-author h-card" href="https://timonapath.com">Tim Roberts</a>
        on <time class="dt-published" datetime="${
          meta.created_at
        }">${formatDate(
  new Date(meta.created_timestamp),
  "MMMM do, y"
)} at ${formatDate(new Date(meta.created_timestamp), "h:mm a")}</time>
        ${
          meta.updated_timestamp > meta.created_timestamp
            ? ` |  <span>Updated on <time class="dt-updated" datetime="${
            meta.updated_timestamp
          }">${formatDate(
                new Date(meta.updated_timestamp),
                "MMMM do, y"
              )} at ${formatDate(
                new Date(meta.updated_timestamp),
                "h:mm a"
              )}</time></span>`
            : ""
        }</p>
              <p class="p-summary">${meta.summary}</p>
              </header>
              <main class="e-content">
              ${data}
              </main>
    <aside>
        <h3>Webmentions on this page</h3>
        <div id="webmentions">
          Loading...
        </div>
    </aside>
    <footer>
      <p>
        Did you spot anything wrong? Do you disagree vehemently? Post on your own site, mark it up as a <a href="https://indieweb.org/reply" target="_blank">
        <span class="code">reply</span></a>, and email me (email found in my <span class="code">h-card</span>).
      </p>
    </footer>
  </article>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
  <script>
    ${webmentions(meta)}
  </script>
</body>
</html>`;

const createInitialMetaData = async (markdowPath, rootConfig) => {
  const stats = await fss.stat(markdowPath);

  return {
    created_timestamp: stats.birthtime.toISOString(),
    updated_timestamp: stats.mtime.toISOString(),
    url: rootConfig.url,
    webmentionURL: rootConfig.webmentionURL
  };
};

module.exports = async (markdownPath, rootConfig, template = defaultTemplate) => {
  console.log("Markdown Path: ", markdownPath);

  const source = new MarkdownIt({
    html: true,
    typographer: true,
    langPrefix: "language-",
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ""; // use external default escaping
    },
  });

  let metadata = await createInitialMetaData(markdownPath, rootConfig);

  source.use(meta, function (str) {
    const parsed = yaml.parse(str)

    metadata = Object.assign(metadata, parsed)
  });

  const parsed = source.render(await fss.readFile(markdownPath, "utf-8"));

  metadata.url = metadata.url ?? pathURL


  return {
    template: template(metadata, parsed),
    metadata,
  };
};
