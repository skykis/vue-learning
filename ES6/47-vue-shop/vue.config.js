module.exports = {
  devServer: {
    // 编译完自动打开浏览器
    open: true,
    // 端口
    port: 9999
  },

  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: false
}
