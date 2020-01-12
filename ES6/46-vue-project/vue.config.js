module.exports = {
  devServer: {
    // 编译完自动打开浏览器
    open: true,
    // 端口
    port: 8888
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
