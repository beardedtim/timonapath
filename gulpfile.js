const { series, parallel, src, dest, watch } = require('gulp')

const postcss = require('gulp-postcss')

const postProcessTypes = {
  js: async () => {},
  css: async () => {},
  img: async () => {}
}

const postProcess = parallel(
  postProcessTypes.js,
  postProcessTypes.css,
  postProcessTypes.img
)

const preProcessTypes = {
  js: async () => {},
  css: () => src('./assets/css/**/*.css').pipe(postcss()).pipe(dest('./app/css')),
  img: async () => {}
}

const preProcess = parallel(
  preProcessTypes.js,
  preProcessTypes.css,
  preProcessTypes.img
)

const clean = async () => {}

const pipeline = series(clean, preProcess, postProcess)

module.exports = {
  pipeline,
  default: () => {
    watch('assets/**/*', pipeline)
  }
}