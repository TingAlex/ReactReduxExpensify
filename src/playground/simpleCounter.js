import React from 'react';
import ReactDOM from 'react-dom';

let count = 0;
let root = document.getElementById('app');
let addOne = () => {
  count++;
  renderApp();
};
let minOne = () => {
  count--;
  renderApp();
};
let reset = () => {
  count = 0;
  renderApp();
};
let renderApp = () => {
  const template = (
    <div>
      <div>count:{count}</div>
      <button onClick={addOne}>+</button >
      <button onClick={minOne}>-</button >
      <button onClick={reset}>reset</button >
    </div>
  );
  ReactDOM.render(template, root);
};
renderApp();
