const metaHTML = require("./meta-into-head-html");

module.exports = ({ links, meta, tags }) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">
${metaHTML({
  ...meta,
  css: `
    <link rel="stylesheet" href="/css/home.css" />
  `,
  title: "",
  summary: "The Internet Portal for Tim Roberts",
  url: "/",
})}
<body>
  <main>
    <section class="h-card profile">
      <header class="section-header">
        <h3 class="p-name">Tim <span class="p-family-name">Roberts</span></h3>
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
            ${links
              .map(
                (link) => `
                <li><a href="${link.url}">${link.title}</a></li>
              `
              )
              .join("\n")}
          </ul>
        </div>
      </div>
    </section>
    <section class="links">
    <header class="section-header">
      <h3>Tags</h3>
    </header>
    <div class="links-body">
      <div>
        <ul>
          ${tags
            .map(
              (tag) => `
              <li><a href="${tag.url}">${tag.title}</a></li>
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
