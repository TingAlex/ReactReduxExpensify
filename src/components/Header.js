import React from 'react';

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

export default Header;
