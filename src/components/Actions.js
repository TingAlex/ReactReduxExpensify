import React from 'react';
import AddAction from './AddAction';
import ActionList from './ActionList';

const Actions = props => {
  return (
    <div>
      <AddAction add={props.add} />
      <ActionList list={props.list} delete={props.delete} />
    </div>
  );
};

export default Actions;
