const fetch = require('node-fetch')

const FormData = require('form-data')

const whatIsBodyContentType = (data) => {
  if (data instanceof FormData) {
    return 'multipart/form-data'
  }

  return 'application/json'
}

module.exports = (url, data, config) => {
  const contentType = whatIsBodyContentType(data)

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      ...config.headers
    },
    body: data
  })
}