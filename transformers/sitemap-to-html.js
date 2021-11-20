const metaHTML = require("./meta-into-head-html");
const linesHTML = require("./lines-to-html");

module.exports = ({ groups, meta }) => `
<!DOCTYPE html>
<html lang="en" xmlns:og="http://ogp.me/ns#">
${metaHTML({
  ...meta,
  css: `
    <link rel="stylesheet" href="/css/home.css" />
  `,
  title: "",
  summary: "The Sitemap for timonapath.com",
  url: "/sitemap",
})}
<body>
  <main>
    <ul class="h-sitemap">
      ${linesHTML(
        [...groups.entries()].map(
          ([header, pages]) => `
          <li>${header}
            <ul>
              ${linesHTML(
                pages.map(
                  ({ url, name }) => `
                <li>
                  <a href="${url}">${name}</a> 
                </li>
                `
                )
              )}
            </ul>
          </li>
        `
        )
      )}
    </ul>
    
  </main>
</body>

</html>
`;
