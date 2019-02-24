import React from 'react';
import ReactDOM from 'react-dom';

console.log('server running');

class Indecision extends React.Component {
  state = {
    list: [],
    selected: '',
  };
  addOne = item => {
    this.setState(prevState => ({ list: prevState.list.concat(item) }));
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
