const httpHTML = require('./http-html')
const httpPost = require('./http-post')
const FormData = require('form-data')

const findLinkURLs = ({ $ }) => {
  const linkURLS = $(`[rel="webmention"],[rel="http://webmention.org/"]`)
  const list = []

  linkURLS.each((_, element) => {
    list.push({
      rel: element.attribs.rel,
      url: element.attribs.href
    })
  })

  return list
}

const findHeaderURLS = ({ headers }) => {
  if (headers.link) {
    return headers.link.filter(({ rel }) => rel === "http://webmention.org/")
  }

  return []
}

const findBestMentionURL = (...sources) => {
  for (const source of new Set(sources.flat())) {
    if (source.rel === 'webmention') {
      return source.url
    }
  }
}

module.exports = async (targetURL, sourceURL) => {
  const sourcePage = await httpHTML(sourceURL)

  // We only want to do this for pages we have
  // already deployed because if we don't, there
  // may be an issue where they reject our mention
  // if they right away check the source url we give
  // them
  if (sourcePage.status === 404) {
    throw new TypeError(`You cannot send a webmention if the post is not published on your side. Failing to send "${sourceURL}" to "${targetURL}"`)
  }

  const page = await httpHTML(targetURL)
  const linkURLS = findLinkURLs(page)
  const headerURLS = findHeaderURLS(page)
  
  const url = findBestMentionURL(linkURLS, headerURLS)

  if (!url) {
    console.warn(`Tried to send a webmention to target "${targetURL}" for source "${sourceURL}" but could not find a suitable URL. Skipping`)
    return
  }

  const data = new FormData()

  data.append('source', sourceURL)
  data.append('target', targetURL)

  return httpPost(url, data)
}