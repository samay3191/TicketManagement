import React, { Component } from 'react';
import { getTodaysDate } from '../Utils/CommonMethods';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { hashHistory } from 'react-router';
import { bindActionCreators } from "redux";
import * as actions from '../actions/ticketActions';
import ErrorBlock from './ErrorBlock';
import * as _ from 'lodash';

const mapStateToProps = state => {
    return {
        tickets: state.ticketReducer.tickets,
        selectedTicket: state.ticketReducer.selectedTicket
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class AssignTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingTicket: "",
            assignTo: "Support1",
            assignOn: "",
            pendingTicketError: "",
            assignToError: "",
            assignOnError: "",
        }
    }

    componentWillMount() {
        this.props.getAllTickets();
    }

    componentDidMount() {
        const allPendingTickets = this.getPendingTickets();
        if (allPendingTickets && allPendingTickets.length > 0) {
            this.setState({ pendingTicket: allPendingTickets[0].ticketId });
        }
    }

    onTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    getPendingTickets = () => {
        return _.filter(this.props.tickets, { assignedTo: "" });
    };

    verifyForOverloadedSupport = (allTickets) => {
        const filterdTickets = _.filter(allTickets, {
            assignedTo: this.state.assignTo,
            assignedOn: this.state.assignOn
        });
        if (filterdTickets && filterdTickets.length > 2) {
            const error = `${this.state.assignTo} is loaded on ${this.state.assignOn}. Please select different support person or date.`;
            this.setState({ assignToError: error });
            return false;
        }
        return true;
    };

    assignTicket = (event) => {
        event.preventDefault();
        const allTickets = this.props.tickets;
        if (this.verifyForOverloadedSupport(allTickets)) {
            const pendingTicket = this.state.pendingTicket;
            const ticket = _.find(allTickets, { ticketId: pendingTicket });
            const updatedTicket = _.assign({}, ticket, {
                assignedTo: this.state.assignTo,
                assignedOn: this.state.assignOn
            });
            this.props.updateTicket(updatedTicket);
            hashHistory.push("/TicketList");
        }
    };

    render() {
        const pendingTickets = this.getPendingTickets();
        return (
            <div style={{ width: "50%" }}>
                <div><h3>Assign Ticket</h3></div>
                <div className="TicketForm">
                    <form name="AssignTicketForm" onSubmit={this.assignTicket} >
                        <label htmlFor="pendingTicket">Pending Tickets</label>
                        <select
                            id="pendingTicket"
                            name="pendingTicket"
                            value={this.state.pendingTicket}
                            onChange={this.onTextChange}
                        >
                            {pendingTickets.length > 0 ?
                                pendingTickets.map(ticket => {
                                    return <option value={ticket.ticketId}>{`${ticket.empName} - ${ticket.issueType}`}</option>
                                })
                                :
                                <option value="" disabled={true}>No Tickets Available</option>
                            }
                        </select>
                        <ErrorBlock errorMessage={this.state.pendingTicketError} />

                        <label htmlFor="assignTo">Assign To</label>
                        <select
                            id="assignTo"
                            name="assignTo"
                            value={this.state.assignTo}
                            onChange={this.onTextChange}
                        >
                            <option value="Support1">Support 1</option>
                            <option value="Support2">Support 2</option>
                            <option value="Support3">Support 3</option>
                        </select>
                        <ErrorBlock errorMessage={this.state.assignToError} />

                        <label htmlFor="assignOn">Assign On</label>
                        <input
                            type="date"
                            id="assignOn"
                            name="assignOn"
                            min={getTodaysDate()}
                            value={this.state.assignOn}
                            onChange={this.onTextChange}
                        />
                        <ErrorBlock errorMessage={this.state.assignOnError} />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

AssignTicket.propTypes = {
    tickets: PropTypes.array,
    selectedTicket: PropTypes.node
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignTicket);
