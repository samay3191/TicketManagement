import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import * as actions from './js/actions/ticketActions';

const mapStateToProps = state => {
  return {
    tickets: state.ticketReducer.tickets,
    selectedTicket: state.ticketReducer.selectedTicket
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class App extends Component {

  constructor() {
    super();
  }

  goToPage = (path) => {
    hashHistory.push(path);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="AppBar">
            <h3>React Demo</h3>
          </div>
          <div className="NavigationBar">
            <ul>
              <li onClick={() => this.goToPage("/AddTicket")}>Add Ticket</li>
              <li onClick={() => this.goToPage("/TicketList")}>Ticket List</li>
              <li onClick={() => this.goToPage("/AssignTicket")}>Assign Ticket</li>
            </ul>
          </div>
          {this.props.children}
        </header>
      </div>
    );
  }
}

App.propTypes = {
  tickets: PropTypes.array,
  selectedTicket: PropTypes.node
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
