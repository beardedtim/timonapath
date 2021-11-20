const ifPresent = require('../utils/if-present')

module.exports = (meta) => `
<head>
  <!--
    Meta Tags
  -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${ifPresent(meta.summary, (value) => `<meta name="description" content="${value}">`, '')}
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
  <meta property="og:url" content="https://timonapath.com/${meta.url.indexOf('/') === 0 
  ? meta.url.slice(1) : meta.url}"/>
  <meta property="og:title" content="${meta.title ? `${meta.title} | ` : ''}Tim on a Path" />
  ${ifPresent(meta.summary, (value) => `<meta property="og:description" content="${value}" />`, '')}
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
  ${
    meta.css || ''
  }
  <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
  <title>${meta.title ? `${meta.title} | ` : ''}Tim on a Path</title>

</head>`