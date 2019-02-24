> 接下来我会在第一个 react counter app 的基础上开发一个稍微复杂一点点的项目。你可以下载 [ReactSimpleCounter](https://github.com/TingAlex/ReactSimpleCounter) 并在根目录下运行命令 `npm install` 完成安装，用 `npm dev-server` 运行项目，本文在以上项目基础上开发。Indecision app 是一个为你做决定的小应用。它从你输入的列表项中随机为你选取一个弹出。同时支持删除表项操作。
### 目录结构

###
### 实现步骤
1. 首先在 'devDependencies' 安装 [babel-plugin-transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties)，它能够是我们免于在 constructor 的重复 bind 操作。
```
C:\Users\Ting\Downloads\test\ReactCounter>cnpm install --save-dev babel-plugin-transform-class-properties
```
将 `.babelrc` 文件配置为：
```
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": ["transform-class-properties"]
}
```
将 `src/app.js` 中的原有代码注释下，我们来测试下刚刚的插件是否配置成功：
```
import React from 'react';
import ReactDOM from 'react-dom';

console.log('server running');
class Counter extends React.Component {
  // 因为我们还用不到 props，所以可以省略 constructor 中的 super 了。又因为有了 babel-plugin-transform-class-properties
  // 所以可以直接省略了 constructor
  state = { count: 0 };
  addOne = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };
  minOne = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  };
  reset = () => {
    this.setState(prevState => ({ count: 0 }));
  };
  render() {
    return (
      <div>
        <div>Count:{this.state.count}</div>
        <button onClick={this.addOne}>+</button>
        <button onClick={this.minOne}>-</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById('app'));
```
搞定。
2. 项目 UML 图
![Indecision UML](https://upload-images.jianshu.io/upload_images/10453247-ef58e038223fe3c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 将 `src/app.js` 中的原有代码注释掉，以下是 Indecision app 的代码。
```
import React from 'react';
import ReactDOM from 'react-dom';

console.log('server running');

class Indecision extends React.Component {
  state = {
    list: [],
    selected: '',
  };
  addOne = item => {
    if (this.state.list.indexOf(item) === -1) {
      this.setState(prevState => ({ list: prevState.list.concat(item) }));
    }
  };
  deleteOne = item => {
    this.setState(prevState => ({
      list: prevState.list.filter(li => li !== item),
    }));
  };
  chooseOne = () => {
    let index = Math.floor(Math.random() * this.state.list.length);
    this.setState(prevState => ({
      list: prevState.list,
      selected: prevState.list[index],
    }));
  };
  render() {
    return (
      <div>
        <Header
          selected={this.state.selected}
          length={this.state.list.length}
          choose={this.chooseOne}
        />
        <Actions
          list={this.state.list}
          delete={this.deleteOne}
          add={this.addOne}
        />
      </div>
    );
  }
}
const Header = props => {
  // 这种无状态组件本身不会像继承自 React.Component 的一样获得 state 与 props，但是我们
  // 可以将 props 手动传递进来。
  // 这其实就是一个正常的函数。
  return (
    <div>
      {props.selected === '' ? '' : <h1>{props.selected}</h1>}
      <h1>You have {props.length} items</h1>
      <button onClick={props.choose}>Choose</button>
    </div>
  );
};
const Actions = props => {
  return (
    <div>
      <AddAction add={props.add} />
      <ActionList list={props.list} delete={props.delete} />
    </div>
  );
};
const AddAction = props => {
  const handleSubmit = event => {
    // 阻止默认的提交后刷新页面的行为。
    event.preventDefault();
    // 下面记得把这个 input 设置 name 属性，才能获得 option。
    let option = event.target.elements.option;
    let text = option.value.trim();
    if (text !== '') {
      props.add(text);
      option.value = '';
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="option" type="text" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
const ActionList = props => {
  return (
    <ul>
      {props.list.map(item => {
        return (
          <li key={item}>
            {item}
            {/* 这里一定要传入参数，又不能立即执行，所以只能再用个函数包装下 */}
            <button onClick={e => props.delete(item)}>remove</button>
          </li>
        );
      })}
    </ul>
  );
};

ReactDOM.render(<Indecision />, document.getElementById('app'));
```
4. 在 VSCode 中打开一个终端，运行：
```
C:\Users\Ting\Downloads\test\ReactCounter>npm run dev-server
```
在浏览器中打开 http://127.0.0.1:8080/，成功！

![Screen Recording 2019-02-24 at 11.51.39.65 AM.gif](https://upload-images.jianshu.io/upload_images/10453247-388519703582b23b.gif?imageMogr2/auto-orient/strip)

5. 我又将项目进行了拆分。拆分要注意的就是导出方式，对于类可以把 export default 直接写在 lass 定义处，对于函数，推荐使用 export default functionName 的方式。引入时使用 import NewName from "address" 就好了。
