module.exports = (value, template) => typeof value !== 'undefined' ? template(value) : ''