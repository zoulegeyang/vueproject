module.exports = {
    devServer:{
      proxy:'http://localhost:5000'
    },
    configureWebpack: {
      resolve: {
        alias: {
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views',
        }
      }
    },
    // publicPath:'./',
    // assetsPublicPath:'./',
  }
  