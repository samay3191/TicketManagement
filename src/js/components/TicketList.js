import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../actions/ticketActions';

const mapStateToProps = state => {
    return {
      tickets: state.ticketReducer.tickets,
      selectedTicket: state.ticketReducer.selectedTicket
    };
};
  
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class TicketList extends Component {
    getTicketStatus = ticket => {
        const ticketStatus =
            ticket.isCompleted ? "Resolved" :
            ticket.assignedTo ? `Assigned To ${ticket.assignedTo}` :
            "Pending";
        return ticketStatus;
    };

    render() {
        return (
            <div style={{ width: "50%" }}>
                <div><h3>Logged Tickets</h3></div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Logged By</th>
                                <th>Email</th>
                                <th>Issue</th>
                                <th>Logged On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        { this.props.tickets && this.props.tickets.length > 0 ?
                            this.props.tickets.map(ticket => (
                                <tr key={ticket.ticketId}>
                                    <td>{ticket.empName}</td>
                                    <td>{ticket.empEmail}</td>
                                    <td>{ticket.issueType}</td>
                                    <td>{ticket.issueDate}</td>
                                    <td>{this.getTicketStatus(ticket)}</td>                                    
                                </tr>
                            ))
                            :
                            <p>No tickets Found</p>
                        }
                    </table>
                </div>
            </div>
        );
    }
}

TicketList.propTypes = {
    tickets: PropTypes.array,
    selectedTicket: PropTypes.node
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
