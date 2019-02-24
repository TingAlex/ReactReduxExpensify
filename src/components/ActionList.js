import React from 'react';

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

export default ActionList;
