const path = require('path');
module.exports = {
  // 待转译的文件入口
  entry: './src/playground/reduxCounter.js',
  // 通过 node 提供的 path 函数获得当前目录。最终合并输出一个 bundle.js
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        // 将 js 与 jsx 文件都进行转译
        test: /\.js$/,
        // 转译非 node_modules 文件夹下的其他所有js文件
        exclude: /node_modules/,
      },
    ],
  },
  // 别忘记配置 server！默认端口为 8080
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // 将无法识别的地址都返回给 client 端的 index.html
    historyApiFallback: true,
  },
  // 浏览器调试发现错误后可以追溯到转译前源代码的报错位置
  devtool: 'cheap-module-eval-source-map',
};
