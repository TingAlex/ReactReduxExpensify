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
