import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';

const ExpenseDashboardPage = () => {
  return <div>DashboardPage</div>;
};

const AddExpensePage = () => {
  return <div>AddExpensePage</div>;
};
const NotFoundPage = () => {
  return <div>We can't find that page.</div>;
};
const EditExpensePage = props => {
  return <div>Id is {props.match.params.id}</div>;
};

// 修改了routes，注意将 Header 放在 Switch 之外！
const routes = () => (
  <BrowserRouter>
    <div>
      <Header />
      {/* BrowserRouter期望我们在其中要么只有一个div要么没有，所以我们要用div把多个router括起来。 */}
      <Switch>
        {/* 在找到匹配的后就会停下来，阻止每个页面都有 404 信息 */}
        <Route exact path="/" component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        {/* 找不到的路由最终会得到这个页面 */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default routes;
