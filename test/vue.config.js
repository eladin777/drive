const { defineConfig } = require('@vue/cli-service')

const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}



module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src'))
  }
  // devServer: {
  //   port: '8080',
  //   // https:false,
  //   open: true,
  //   //以上的ip和端口是我们本机的;下面为需要跨域的
  //   proxy: { //配置跨域
  //     '/api': {
  //       target: 'http://localhost:8081/',
  //       ws: true,
  //       changeOrigin: true,//允许跨域
  //       pathRewrite: {
  //         '^/api': '/'   //请求的时候使用这个api就可以
  //       }
  //     }
  //   }
  // }
})


