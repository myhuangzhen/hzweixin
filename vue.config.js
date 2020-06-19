// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: '', // 对应自己的接口
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': '',
//                 },
//             },
//         },
//     },
// }
const px2rem = require('postcss-px2rem') 
// 配置基本大小 
const postcss = px2rem({ 
  // 基准大小 baseSize，需要和rem.js中相同 
  remUnit: 16
})
  // 使用等比适配插件 
  // module.exports = { lintOnSave: true, css: { loaderOptions: { postcss: { plugins: [ postcss ] } } } }
module.exports = {
    devServer: {
      proxy: 'http://47.92.121.146:9000'
    },
    lintOnSave: true,
    css: {
      loaderOptions: { 
        postcss: { 
          plugins: [ 
            require('postcss-px2rem')({ //配置项，详见官方文档
              remUnit: 100
            }), // 换算的基数
           ] 
        } 
      } 
    }
  }
