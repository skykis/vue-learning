const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// htmlPlugin插件配置
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})
const extractText = new ExtractTextPlugin('style.css')

module.exports = {
  mode: 'development', // 构建模式（development 或 production）
  entry: path.join(__dirname, './src/index.js'), // 构建依赖的入口，默认值为./src
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js' // 输入文件的名称,默认main.js
  }, // 输出目录，默认值为 ./dist
  plugins: [htmlPlugin, extractText],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
}
