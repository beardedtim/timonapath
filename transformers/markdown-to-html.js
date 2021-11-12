const MarkdownIt = require('markdown-it')
const fss = require('fs/promises')
const hljs = require('highlight.js')
const meta = require('markdown-it-front-matter');

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

  <!--
    Fonts
  -->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600&display=swap" rel="stylesheet" as="font"
    type="text/css">

  <!--
    Styles
  -->
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/skeleton.css">
  <link rel="stylesheet" href="/css/snippet.css" />
  <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
  <title>${meta.title} | Tim on a Path</title>

</head>

<body>
  <article class="h-entry">
    <header>
      <a href="https://timonapath.com/${meta.url}" class="u-url">
        <h2 class="p-name">${meta.title}</h2>
      </a>
      <p>Published by <a class="p-author h-card" href="https://timonapath.com">Tim Roberts</a>
        on <time class="dt-published" datetime="${meta.created_at}">${meta.created_at}</time></p>
      <p class="p-summary">${meta.summary}</p>
    </header>
    <main class="e-content">
      ${data}
    </main>
    <footer>
      <p>
        Did you spot anything wrong? Do you disagree vehemently? Post on your own site, mark it up as a <a href="https://indieweb.org/reply" target="_blank">
        <span class="code">reply</span></a>, and email me (email found in my <span class="code">h-card</span>).
      </p>
    </footer>
  </article>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
</body>
</html>`

module.exports = async (markdownPath) => {
  const source = new MarkdownIt({
    html: true,
    typographer: true,
    langPrefix: 'language-',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }
   
      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}
   
      return ''; // use external default escaping
    }
  })
  
  const metadata = {}

  source.use(meta, function(str) {
    const lines = str.split('\n')
    const groups = lines.map(line => line.split(':').map(str => str.trim()))

    for (const [key, value] of groups) {
      metadata[key] = value
    }
  })

  const parsed = source.render(await fss.readFile(markdownPath, 'utf-8'))

  return {
    template: template(metadata, parsed),
    metadata
  }
}