module.exports = {
  plugins:[
    require('postcss-preset-env')({
      stage: 0,
      browsers: [
        '> 0.25%',
        'last 2 versions'
      ]
    }),
    require("postcss-import")(),
    require('cssnano')()
  ]
}