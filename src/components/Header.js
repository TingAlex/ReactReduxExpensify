import React from 'react';
import { NavLink } from 'react-router-dom';

// 新增 Header 提供 Link 链接至 client 端不同页面
const Header = () => {
  return (
    <div>
      <NavLink exact to="/" activeClassName="is-active">
        ExpenseDashboardPage
      </NavLink>
      <NavLink to="/create" activeClassName="is-active">
        AddExpensePage
      </NavLink>
      <NavLink to="/404" activeClassName="is-active">
        NotFoundPage
      </NavLink>
    </div>
  );
};

export default Header;
