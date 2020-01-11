const path = require('path')

module.exports = {
  mode: 'development', // 构建模式（development 或 production）
  entry: path.join(__dirname, './src/index.js'), // 构建依赖的入口，默认值为./src
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js' // 输入文件的名称,默认main.js
  } // 输出目录，默认值为 ./dist
}
