module.exports = (meta) => `
window.addEventListener('load', async () => {
  const mentionsHTMLContainer = document.getElementById('webmentions')
  if (mentionsHTMLContainer) {
    const mentionHTML = await fetch('/api/webmentions?path=${encodeURI(meta.url)}').then(x => {
      if (x.status < 300) {
        return x.text()
      }
  
      return '<i>None Available. Send me one?</i>'
    })
  
    mentionsHTMLContainer.innerHTML = mentionHTML
    console.log('Updated webmentions')
  }
})
`