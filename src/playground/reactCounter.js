import React from 'react';
import ReactDOM from 'react-dom';

console.log('server running');
class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
    this.addOne = this.addOne.bind(this);
    this.minOne = this.minOne.bind(this);
    this.reset = this.reset.bind(this);
  }
  addOne() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }
  minOne() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }
  reset() {
    this.setState(prevState => ({ count: 0 }));
  }
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

// class Counter extends React.Component {
//   // 因为我们还用不到 props，所以可以省略 constructor 中的 super 了。又因为有了 babel-plugin-transform-class-properties
//   // 所以可以直接省略了 constructor
//   state = { count: 0 };
//   addOne = () => {
//     this.setState(prevState => ({ count: prevState.count + 1 }));
//   };
//   minOne = () => {
//     this.setState(prevState => ({ count: prevState.count - 1 }));
//   };
//   reset = () => {
//     this.setState(prevState => ({ count: 0 }));
//   };
//   render() {
//     return (
//       <div>
//         <div>Count:{this.state.count}</div>
//         <button onClick={this.addOne}>+</button>
//         <button onClick={this.minOne}>-</button>
//         <button onClick={this.reset}>reset</button>
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Counter />, document.getElementById('app'));