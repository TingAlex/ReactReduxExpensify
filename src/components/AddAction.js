import React from 'react';

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

export default AddAction;
