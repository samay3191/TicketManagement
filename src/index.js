import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./js/store/index";
import { Router, Route, hashHistory } from 'react-router'
import AddTicket from './js/components/AddTicket';
import AssignTicket from './js/components/AssignTicket';
import TicketList from './js/components/TicketList';

ReactDOM.render(<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="AddTicket" component={AddTicket}/>
        <Route path="TicketList" component={TicketList}/>
        <Route path="AssignTicket" component={AssignTicket}/>
        <Route path="AssignTicket/:SelectedTicketId" component={AssignTicket}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
