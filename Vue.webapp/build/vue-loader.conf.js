var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),require('postcss-px2rem')({
      rootValue: 75, // 这里对应的是750的设计图尺寸
      selectorBlackList: ['html'],
      mediaQuery: true,
      propBlackList: ['border-radius','border'] // 如果要保持font-size不转换，替换为 ['font-size']
    })
  ]
}
