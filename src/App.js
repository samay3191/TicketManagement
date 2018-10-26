import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router'

const mapStateToProps = state => {
  return { countries: state.countries };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

class App extends Component {

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
  tickets: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
