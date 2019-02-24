import React from 'react';
import Header from './Header';
import Actions from './Actions';

export default class Indecision extends React.Component {
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
