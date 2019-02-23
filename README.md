> 作为我毕设的第一块奠基石，话不多说，盘它！
### 目录结构
![ReactCounter 目录结构](https://upload-images.jianshu.io/upload_images/10453247-77da4f4628edb1a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 实现步骤
1. 新建文件夹 ReactCounter，使用 VSCode 打开此文件夹
2. 检查 node 与 npm 版本以验证是否安装成功
```
C:\Users\Ting\Downloads\test\ReactCounter>node -v
v8.11.3
C:\Users\Ting\Downloads\test\ReactCounter>npm -v
5.6.0
```
3. 初始化 npm 项目
```
C:\Users\Ting\Downloads\test\ReactCounter>npm init
```
之后按照提示一路回车结束配置
3. 将 webpack 与 webpack-dev-server 安装为 `devDependencies`: webpack 可以把我们前端的各种类型文件进行合并，它像是一个工厂，根据你在 webpack.config.js 中的配置，使用你引入的其他库，对文件进行转译与打包操作。比如你可以引入 babel 来把 react 对 js 的语法拓展 jsx 转译为普通的 js 文件。 webpack-dev-server 是一个热加载服务器可以在检测到代码变动后自动刷新浏览器页面，需要在 webpack 中配置，等一下我们配置它。目前我使用 cnpm 来安装 modules，因为 cnpm 的源在中国，下载速度更快
```
C:\Users\Ting\Downloads\test\ReactCounter>cnpm install webpack webpack-cli webpack-dev-server --save-dev
```
4. 将 react 相关 modules 安装为 `dependencies`
```
C:\Users\Ting\Downloads\test\ReactCounter>cnpm install react react-dom
```
5. 为了让 webpack 能将 jsx 语法转译并打包为普通 js 文件，我们还需要安装 [babel](https://babeljs.io)。Babel 用于将 ECMAScript 2015+ 代码转换为与浏览器向后兼容的 JavaScript。 
> @babel-core 和 babel-cli 的区别是 babel-cli 可以在命令行里运行babel，而 babel-core 能够在 webpack 中去配置 babel，因为我们使用 webpack 管理项目，所以安装 @babel-core
babel-loader 是指导webpack在看到特定的js文件时如何去运行babel
@babel/preset-env 可将一些 js 先进的语法编译成 ES5 代码，@babel/preset-react 是将 jsx 转译成 ES5 代码。
```
C:\Users\Ting\Downloads\test\ReactCounter>cnpm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
6. 可以配置 webpack了。根目录新建 `webpack.config.js`，填写如下内容：
```
const path = require('path');
module.exports = {
  // 待转译的文件入口
  entry: './src/app.js',
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
  },
  // 浏览器调试发现错误后可以追溯到转译前源代码的报错位置
  devtool: 'cheap-module-eval-source-map',
};
```
7. 配置 babel-loader。根目录新建 `.babelrc.js`，填写如下内容：（千万注意babelrc文件名前有一个“.”！）
```
{
  "presets": ["@babel/env", "@babel/react"]
}
```
8. 根据 `webpack.config.js` 中设置的文件入口与输出，新建文件夹 `src` 与 `public`，并在 `src` 下新建文件 `app.js`，内容如下：
```
import React from 'react';
import ReactDOM from 'react-dom';

console.log('server running');

let count = 0;
const addOne = () => {
  count++;
  renderCounterApp();
};
const minusOne = () => {
  count--;
  renderCounterApp();
};
const reset = () => {
  count = 0;
  renderCounterApp();
};
const renderCounterApp = () => {
  const templateFive = (
    <div>
      <h1>Count:{count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  );
  ReactDOM.render(templateFive, appRoot);
};
var appRoot = document.getElementById('app');
renderCounterApp();
```
9. 在 `public` 文件夹下新建文件 `index.html`，内容如下：
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```
10. 在 `package.json` 中设置 `scripts` 字段：
```
  "scripts": {
    "build": "webpack",
    "dev-server": "webpack-dev-server"
  },
```
> build 是 production 版本生成用的。值得注意的一点是，dev-server 命令用到的 bundle.js 是存储在内存中的而不是你原来的那个文件，这样的效率更高。并且你之后对项目进行修改，新生成的 bundle 并不是写回了你之前的那个 bundle，而是还在内存中。如果你真的想要这个 bundle，你必须运行 npm run build。

11. 在 VSCode 中打开一个终端，运行：
```
C:\Users\Ting\Downloads\test\ReactCounter>npm run dev-server
```
在浏览器中打开 http://127.0.0.1:8080/，成功！
![Screen Recording 2019-02-23 at 02.58.21.98 PM.gif](https://upload-images.jianshu.io/upload_images/10453247-5c027136ed7bdff6.gif?imageMogr2/auto-orient/strip)
