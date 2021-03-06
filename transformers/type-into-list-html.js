const Case = require("case");

module.exports = ({ links, type }) => {
  const sentenceCase = Case.sentence(type);
  const urlCase = Case.lower(type, "/", true);

  return `
  <!DOCTYPE html>
  <html lang="en" xmlns:og="http://ogp.me/ns#">
  
  <head>
    <!--
      Meta Tags
    -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A list of ${sentenceCase} from Tim Roberts">
    <meta name="author" content="Tim Roberts">
  
    <!--
      Icon Links
    -->
    <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
    <link rel="manifest" href="/img/site.webmanifest">
    <!--
      Facebook OpenGraph Cards
    -->
    <meta property="og:url" content="https://timonapath.com/${
      urlCase.indexOf("/") === 0 ? urlCase.slice(1) : urlCase
    }" />
    <meta property="og:title" content="Snippets | Tim on a Path" />
    <meta property="og:description" content="A list of ${sentenceCase} from Tim Roberts" />
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
    <link rel="stylesheet" href="/css/home.css" />
    <title>${sentenceCase} | Tim on a Path</title>
  
  </head>
  
  <body>
    <main>
      <section class="links">
        <header class="section-header">
          <h3>${type}</h3>
        </header>
        <div class="links-body">
          <div>
            <ul class="h-feed">
              ${links
                .map(
                  ({ url, title }) => `
                  <li><a href="${url}">${title}</a></li>
                `
                )
                .join("\n")}
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footer>
  
    </footer>
  </body>
  
  </html>
  `;
};
