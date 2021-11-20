const markdownToHTML = require("./markdown-to-html");
const { format: formatDate } = require("date-fns");
const webmentions = require("./meta-into-webmentions-script");

const template = (meta, data) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">

<head>
  <!--
    Meta Tags
  -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="In Reply To ${meta.target}">
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
  <meta property="og:description" content="In Reply To ${meta.target}" />
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
      <p>Published by <a class="p-author h-card u-url" href="https://timonapath.com">Tim Roberts</a>
        on <time class="dt-published" datetime="${
          meta.created_at
        }">${formatDate(
  new Date(meta.created_timestamp),
  "MMMM do, y"
)} at ${formatDate(new Date(meta.created_timestamp), "h:mm a")}</time>
      </p>
      </header>
      <main class="e-content">
      Repling to <a class="u-in-reply-to" href="${
        meta.target
      }" target="_blank">${meta.target}</a>
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

module.exports = (markdowPath, rootConfig) =>
  markdownToHTML(markdowPath, rootConfig, template);
