import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router';
import rootActions from '../actions/index';

const mapStateToProps = state => {
    return {
      tickets: state.ticketReducer.tickets,
      selectedTicket: state.ticketReducer.selectedTicket
    };
};
  
const mapDispatchToProps = dispatch => bindActionCreators(rootActions, dispatch);

class TicketList extends Component {

    componentWillMount() {
        this.props.setNavigation("TicketList");
    }

    getTicketStatus = ticket => {
        const ticketStatus =
            ticket.isCompleted ? "Resolved" :
            ticket.assignedTo ? `Assigned To ${ticket.assignedTo}` :
            "Pending";
        return ticketStatus;
    };

    render() {
        return (
            <div className="TicketList">
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
                                <th>Assign</th>
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
                                    <td>
                                        { ticket.assignedTo ? 
                                            "Already Assigned" :
                                            <Link to={`/AssignTicket/${ticket.ticketId}`}>Assign</Link>
                                        }
                                    </td>
                                </tr>
                            ))
                            :
                            <tbody>
                                <tr><td colSpan="6">No tickets Found</td></tr>
                            </tbody>
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
