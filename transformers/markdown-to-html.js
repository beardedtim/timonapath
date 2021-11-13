const MarkdownIt = require("markdown-it");
const fss = require("fs/promises");
const hljs = require("highlight.js");
const meta = require("markdown-it-front-matter");
const webmentions = require('./meta-into-webmentions-script')
const { format: formatDate } = require("date-fns");

const yaml = require('yaml');

const defaultTemplate = (meta, data) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">

<head>
  <!--
    Meta Tags
  -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${meta.summary}">
  <meta name="author" content="Tim Roberts">

  <!--
    Icon Links
  -->
  <link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
  <link rel="manifest" href="img/site.webmanifest">
  <!--
    Facebook OpenGraph Cards
  -->
  <meta property="og:url" content="https://timonapath.com/${meta.url}"/>
  <meta property="og:title" content="${meta.title} | Tim on a Path" />
  <meta property="og:description" content="${meta.summary}" />
  <meta property="og:site_name" content="Tim on a Path" />

  <!--
    Twitter Card
  -->
  <meta name="twitter:card" content="summary" />

  <!--
    IndieAuth
  -->
  <link href="mailto:timroberts@fastmail.org" rel="me" />
  <link href="https://github.com/beardedtim" rel="me" />
  <link href="https://indieauth.com/auth" rel="authorization_endpoint" />
  <link rel="openid.delegate" href="https://timonapath.com/" />
  <link rel="openid.server" href="https://openid.indieauth.com/openid" />

  <!--
    Webmentions
  -->
  <link href="${meta.webmentionURL}" rel="webmentions" />

  <!--
    Fonts
  -->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600&display=swap" rel="stylesheet" as="font"
    type="text/css">

  <!--
    Styles
  -->
  <link rel="stylesheet" href="/css/leaf.css" />
  <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
  <title>${meta.title} | Tim on a Path</title>

</head>

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
    console.log(metadata)
  });

  console.log(metadata);

  const parsed = source.render(await fss.readFile(markdownPath, "utf-8"));

  console.log(metadata);

  metadata.url = metadata.url ?? pathURL


  return {
    template: template(metadata, parsed),
    metadata,
  };
};
