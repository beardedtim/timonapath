module.exports = (value, template, fallback) =>
  typeof value !== "undefined" ? template(value) : fallback;
