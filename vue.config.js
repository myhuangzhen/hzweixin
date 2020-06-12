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
module.exports = {
    devServer: {
      proxy: 'http://47.92.121.146:9000'
    }
  }