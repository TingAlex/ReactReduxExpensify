> 这篇文章在上一篇的基础上加入 redux。你可以下载 [ReactReduxExpensify](https://github.com/TingAlex/ReactReduxExpensify/tree/f166d9479e2ba1a476d42a2740cf7c0b0374b12e) （注意通过此下载链接获得对应的历史版本，而不是在 github 下载这个项目的 master 版本）并在根目录下运行命令 `npm install` 完成安装，用 `npm dev-server` 运行项目。
1. 安装 redux 至 `dependencies`。
```
C:\Users\Ting\Downloads\test\ReactExpensify>cnpm install redux --save
```
2. 在 `src/playground/` 目录下新建 `redux101.js`，我们将在这里测试 redux 的基本操作。将 `webpack.config.js` 中的 `entry` 字段更改为
```
  entry: './src/playground/redux101.js',
```
在 `src/playground/redux101.js` 中加入如下代码：
```
import { createStore } from 'redux';
console.log('redux 101');

// reducers是纯函数。纯函数的几个条件：
// 1.输出只取决于输入，并没有用到这个函数scope之外的代码，
//   也没有改变scope之外的代码，比如全局变量什么的
// 2.不会改变原来传入的变量的值，比如state和action，而只是返回新产生的内容

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INC':
      return {
        count: state.count + 1,
      };
      break;
    case 'MIN':
      return {
        count: state.count - 1,
      };
      break;
  }
};

const store = createStore(countReducer);

// 记住要把 subscribe 放在各种 despatch 动作之前！
// unsubscribe 就是刚刚 subscribe 函数的返回值
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Action generator，是一个可以返回action的函数
// 用函数包装下是因为如果 type 打错字很难被发现，但函数被打错一下子就会被提示
const incAction = () => {
  return { type: 'INC' };
};
const minAction = () => {
  return { type: 'MIN' };
};

// dispatch把 action对象 传递给store。每当 store 接收到了一个 action，
//就会根据 reducer 中的配置执行对应代码。这样就会更新 state 了
store.dispatch(incAction());
store.dispatch(minAction());
store.dispatch(minAction());
unsubscribe();
```
在 chrome console 中你会得到如下结果：
```
redux 101
{count: 1}
{count: 0}
{count: -1}
```
测试成功！
3. 在 'devDependencies' 安装 [babel-plugin-transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)，它可以方便地帮助我们组装出新的对象，并且可以轻易地添加新的属性进去或者覆写之前的属性。就像这样：`return { ...expense, ...action.updates };`。它现在还没有加入到 js 的 main branch 里面，所以我们需要引入 babel 插件来处理它。
```
C:\Users\Ting\Downloads\test\ReactExpensify>cnpm install babel-plugin-transform-object-rest-spread --save-dev
```
3. 在  `.babelrc` 文件中对 `plugins` 字段做如下修改：
```
 // 新加入 transform-object-rest-spread 插件
 "plugins": ["transform-class-properties", "transform-object-rest-spread"]
```
4. 安装 react-redux 至 `dependencies`。这个库本身只提供两个东西：一个 Provider component 作为 react 项目的根节点（对，就是指在 ReactDOM.render()中的那个组件的根节点）使得所有节点能够访问 redux store 中的内容，一个 connect 函数链接 redux store。
```
C:\Users\Ting\Downloads\test\ReactExpensify>cnpm install react-redux --save
```
5. 在 `src/playground/` 目录下新建 `reduxCounter.js`，我们终于能完成 redux 版的技术器了。将 `webpack.config.js` 中的 `entry` 字段更改为
```
  entry: './src/playground/reduxCounter.js',
```
在 `src/playground/reduxCounter.js` 中加入如下代码：（我使用了 [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) 来在 chrome 中调试 redux，具体安装与配置请点击链接）
```
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

console.log('redux Counter');

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INC':
      return {
        count: state.count + 1,
      };
    case 'MIN':
      return {
        count: state.count - 1,
      };
    case 'RESET':
      return {
        count: 0,
      };
    default:
      return state;
  }
};

const store = createStore(
  countReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const incAction = () => {
  return { type: 'INC' };
};
const minAction = () => {
  return { type: 'MIN' };
};
const resetAction = () => {
  return { type: 'RESET' };
};

class Counter extends React.Component {
  incCount = () => {
    this.props.inc();
  };
  minCount = () => {
    this.props.min();
  };
  reset = () => {
    this.props.reset();
  };
  render() {
    return (
      <div>
        <h1>Count:{this.props.count}</h1>
        <button onClick={this.incCount}>+</button>
        <button onClick={this.minCount}>-</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }
}

// 用来单方向获取到 redux store 中的 state
const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

// 这里是返回 dispatch 函数，而不能直接写 dispatch！
// 通过 dispatch 来对 state 进行修改
const mapDispatchToProps = dispatch => {
  return {
    inc: () => dispatch(incAction()),
    min: () => dispatch(minAction()),
    reset: () => dispatch(resetAction()),
  };
};

// 记住第一个参数是将 state 映射到 props
// 第二个是将 dispatch 映射到 props
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

```
成功！