module.exports = ({ links }) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">

<head>
  <!--
    Meta Tags
  -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="The Internet Portal of Tim Roberts">
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
  <meta property="og:url" content="https://timonapath.com/" />
  <meta property="og:title" content="Tim on a Path" />
  <meta property="og:description" content="The Internet Interface for Tim Roberts" />
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
  <link rel="stylesheet" href="/css/home.css" />
  <title>Tim on a Path</title>

</head>

<body>
  <header>

  </header>
  <main>
    <section class="h-card profile">
      <header class="section-header">
        <h3 class="p-name">Tim <span class="p-family-name">Roberts</span></h2>
      </header>
      <div class="profile-body">
        <div>
          <img class="u-photo u-max-full-width logo" src="img/avatar.jpeg" alt="Image of Tim Roberts">
          <h4 class="meta-header">Also known as:</h4>
          <ul>
            <li><span class="p-given-name"><i>Timothy</i></span></li>
            <li><span class="p-nickname"><i>Moth</i></span></li>
            <li><span class="p-nickname"><i>Timbo Slice</i></span></li>
          </ul>
        </div>
        <div>
          <h4 class="meta-header">Metadata:</h4>
          <p class="meta-field">
            URL: <a href="https://timonapath.com" class="u-id u-url">
              timonapath.com
            </a>
          </p>
          <p class="meta-field">
            Birthday: <span class="dt-bday">October 5, 1988</span>
          </p>
          <p class="meta-field">
            Location: <span class="p-region">Knoxville, TN</span> <span class="p-country-name">USA</span>
          </p>
          <p class="meta-field">
            Current Way to Make Money: <span class="p-job-title">Software Engineer</span>
          </p>
        </div>
      </div>
    </section>
    <section class="links">
      <header class="section-header">
        <h3>Links</h3>
      </header>
      <div class="links-body">
        <div>
          <ul>
            ${
              links.map(link => `
                <li><a href="${link.url}">${link.title}</a></li>
              `).join('\n')
            }
          </ul>
        </div>
      </div>
    </section>
  </main>
  <footer>

  </footer>
</body>

</html>
`