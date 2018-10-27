import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import * as actions from './js/actions/navigationActions';
import Home from './js/components/Home';

const mapStateToProps = state => {
  return {
    activePage: state.navigationReducer.activePage
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class App extends Component {

  goToPage = (path) => {
    hashHistory.push(path);
  };

  setActiveClass = (page) => {
    return this.props.activePage === page ? "active" : "";
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div
            className="AppBar"
            onClick={() => this.goToPage("/")}
          >
            <h2>Ticket Management Demo</h2>
          </div>
          <div className="NavigationBar">
            <ul>
              <li
                className={this.setActiveClass("AddTicket")}
                onClick={() => this.goToPage("/AddTicket")}
              >
                Add Ticket
              </li>
              <li
                className={this.setActiveClass("TicketList")}
                onClick={() => this.goToPage("/TicketList")}
              >
                Ticket List
              </li>
              <li
                className={this.setActiveClass("AssignTicket")}
                onClick={() => this.goToPage("/AssignTicket")}
              >
                Assign Ticket
              </li>
            </ul>
          </div>
          {this.props.children || <Home /> }
        </header>
      </div>
    );
  }
}

App.propTypes = {
  activePage: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
