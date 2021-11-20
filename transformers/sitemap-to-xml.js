
const linesHTML = require('./lines-to-html')

module.exports = ({ groups }) => `

<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
  linesHTML([
    ...groups.values()
  ].map((pages) => `
        ${
          linesHTML(
            pages.map(({ url }) => `
            <url>
              <loc>${url}</loc>
              <changefreq>daily</changefreq>
            </url>
          `)
          )
        }
  `))
      }
</urlset> 
`