> 接下来我会在 react Indecision app 的基础上加入 redux 开发一个开销记录 app。你可以下载 [ReactIndecision](https://github.com/TingAlex/ReactIndecision) 并在根目录下运行命令 `npm install` 完成安装，用 `npm dev-server` 运行项目，本文在以上项目基础上开发。Expensify app 是一个简单的开销记录应用。
1. 删除掉  `src/components` 下的所有文件，删除 `src/app.js` 中的内容
1. Expensify app 需要用到 client 端的路由切换，所以要用到react-router。react-router 有 native 和 web 两种，我们只用到 web 使用的部分。安装如下至 `devDependencies`

```
C:\Users\Ting\Downloads\test\ReactExpensify>cnpm install react-router-dom --save
```
2. 接下来简单验证下是否成功。删除 `src/app.js` 中的内容。现代码如下：
```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

const ExpenseDashboardPage = () => {
  return <div>DashboardPage</div>;
};

const AddExpensePage = () => {
  return <div>AddExpensePage</div>;
};

const routes = (
  <BrowserRouter>
    {/* BrowserRouter期望我们在其中要么只有一个div要么没有，所以我们要用div把多个router括起来。 */}
    <div>
      <Route path="/" component={ExpenseDashboardPage} />
      <Route path="/create" component={ExpenseDashboardPage} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'))
```
3. 运行项目后 `http://localhost:8080` 成功显示 DashboardPage 字样，但访问 `http://localhost:8080/create` 却是显示 "Cannot GET /create"。原因在于我们配置的是 client 端的路由，而对地址栏的直接更改访问的是 server 端的地址，所以我们要去配置webpack中的 server，让它把它识别不了的地址都返回 client 的 index.html，让页面内的 js 自己去处理。当然这只是在开发时使用的。production 怎么配置我萌之后再讲。 `webpack.config.js` 的 devServer 字段中添加以下代码。
> 别忘记重新启动 webpack server，因为对 config 文件做出的修改只用重启后才会生效！
```
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // 新加下一行，将无法识别的地址都返回给 client 端的 index.html
    historyApiFallback: true, 
  },
```
4. 运行后会发现 `http://localhost:8080/create`  中同时显示了 DashboardPage 与 AddExpensePage 字样。因为 route 的路径是一个个匹配的，有符合的就算上而不是只算上一摸一样的那个。所以需要设置 exact 这个标识符。
```
 <Route exact path="/" component={ExpenseDashboardPage} />
```
5. 当访问一个不存在的路径时并没有报错而只是显示空白，于是我们这样添加了一个 404 页面路由作为 router 最后一项：
```
      <Route component={NotFoundPage} />
```
但是这样导致了这个 404 会出现在每一个页面，所以我们要用到 swith 这个 component 去改变默认匹配方式。
```
// 引入了 Switch
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// routes 现修改如下
const routes = (
  <BrowserRouter>
    {/* BrowserRouter期望我们在其中要么只有一个div要么没有，所以我们要用div把多个router括起来。 */}
    <Switch>
      {/* Switch 在找到匹配的后就会停下来，阻止每个页面都有 404 信息 */}
      <Route exact path="/" component={ExpenseDashboardPage} />
      <Route path="/create" component={AddExpensePage} />
      {/* 找不到的路由最终会得到这个页面 */}
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
```
测试后成功！
6. 加入一些跳转标签，对于前端页面内部导航要引入 Link 标签，因为 <a> 标签会导致整个页面的重新刷新和访问服务器。
```
// 引入了 Link
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// 新增 Header 提供 Link 链接至 client 端不同页面
const Header = () => {
  return (
    <div>
      <Link exact to="/">
        ExpenseDashboardPage
      </Link>
      <Link to="/create">AddExpensePage </Link>
      <Link to="/404">NotFoundPage </Link>
    </div>
  );
};
// 修改了routes，注意将 Header 放在 Switch 之外！
 const routes = (
  <BrowserRouter>
    <div>
      <Header />
      {/* BrowserRouter期望我们在其中要么只有一个div要么没有，所以我们要用div把多个router括起来。 */}
      <Switch>
        {/* 在找到匹配的后就会停下来，阻止每个页面都有 404 信息 */}
        <Route exact path="/" component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        {/* 找不到的路由最终会得到这个页面 */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
```
运行成功！我们可以把所有的 Link 改为 NavLink，它有些额外的 props 可以配置，比如我们可以在点击地址后高亮，标识着我们现在哪个页面。
7. 后面我们的浏览器地址中会有动态的部分，比如 `localhost:8080/edit/user_id` 这样的，如何配置动态路由？
```
// 加入此 component
const EditExpensePage = props => {
  return <div>Id is {props.id}</div>;
};
// 在 routes 中加入
 <Route path="/edit/:id" component={EditExpensePage} />
```
测试后发现如下报错：
```
// 报错信息
GET http://localhost:8080/edit/bundle.js 404 (Not Found)
99:1 Refused to execute script from 'http://localhost:8080/edit/bundle.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

这是因为 `public/index.html` 中引入 `bundle.js` 时用的是相对地址，而不是绝对地址。修改成如下：
```
    <script src="/bundle.js"></script>
```
运行成功！访问 `http://localhost:8080/edit/99`，打开 chrome 调试，在 React 调试窗口可见我们的 id 在 `match.params` 中，在 component 中可以通过 `props.match.params.id` 获取到 id
![image.png](https://upload-images.jianshu.io/upload_images/10453247-235e4d957b6c709b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 下一篇文章中我们将在这个项目的基础上引入 redux。