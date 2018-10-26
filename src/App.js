import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from './js/actions/filterActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const mapStateToProps = state => {
  return { countries: state.countries };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>React Demo</h1>
          </div>
          <div>
            <Link to="/AddTicket">Add Ticket</Link>
            <Link to="/TicketList">Ticket List</Link>
            <Link to="/AssignTicket">Assign Ticket</Link>
          </div>
          {this.props.children}
        </header>
      </div>
    );
  }
}

App.PropTypes = {
  tickets: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
