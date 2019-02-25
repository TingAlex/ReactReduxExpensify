import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

class Counter extends React.Component {
  incNum = () => {
    this.props.inc();
  };
  minNum = () => {
    this.props.min();
  };
  reset = () => {
    this.props.reset();
  };
  render() {
    return (
      <div>
        <h1>Count:{this.props.count}</h1>
        <button onClick={this.incNum}>+</button>
        <button onClick={this.minNum}>-</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }
}

const reducer = (state = { count: 0 }, action) => {
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

const store = createStore(reducer);

const incAction = () => ({ type: 'INC' });
const minAction = () => ({ type: 'MIN' });
const resetAction = () => ({ type: 'RESET' });

const mapStateToProps = state => ({ count: state.count });
const mapDispatchToProps = dispatch => ({
  inc: () => dispatch(incAction()),
  min: () => dispatch(minAction()),
  reset: () => dispatch(resetAction()),
});

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
