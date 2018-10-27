import React, { Component } from 'react';
import { getTodaysDate } from '../Utils/CommonMethods';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { hashHistory } from 'react-router';
import { bindActionCreators } from "redux";
import rootActions from '../actions/index';
import ErrorBlock from './ErrorBlock';
import * as _ from 'lodash';

const mapStateToProps = state => {
    return {
        tickets: state.ticketReducer.tickets,
        selectedTicket: state.ticketReducer.selectedTicket
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(rootActions, dispatch);

class AssignTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingTicket: "",
            assignTo: "Support1",
            assignOn: getTodaysDate(),
            pendingTicketError: "",
            assignToError: "",
            assignOnError: "",
        }
    }

    componentWillMount() {
        this.props.getAllTickets();
        this.props.setNavigation("AssignTicket");
    }

    componentDidMount() {
        const allPendingTickets = this.getPendingTickets();
        if (allPendingTickets && allPendingTickets.length > 0) {
            debugger;
            const ticketId = this.props.params ?
            this.props.params.SelectedTicketId :
            allPendingTickets[0].ticketId;
            this.setState({ pendingTicket: ticketId });
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
        if (filterdTickets && filterdTickets.length > 3) {
            const error = `${this.state.assignTo} is loaded on ${this.state.assignOn}. Please select different support person or date.`;
            this.setState({ assignToError: error });
            return false;
        }
        return true;
    };

    checkValidity = (form) => {
        let isValid = true;
        const count = form.length;
        for (let i=0; i < count; i++) {
            if (!form[i].validity.valid) {
                isValid = false;
                this.setState({ [form[i].name+"Error"]: "Please provide valid information" });
            } else {
                this.setState({ [form[i].name+"Error"]: "" });
            }
        }
        return isValid;
    };

    assignTicket = (event) => {
        event.preventDefault();
        const allTickets = this.props.tickets;
        if (this.checkValidity(event.target) && this.verifyForOverloadedSupport(allTickets)) {
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
                            required
                        >
                            {pendingTickets.length > 0 ?
                                pendingTickets.map(ticket => {
                                    return <option
                                    key={ticket.ticketId}
                                    value={ticket.ticketId}>
                                        {`${ticket.empName} - ${ticket.issueType}`}
                                    </option>
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
                            required
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
                            required
                        />
                        <ErrorBlock errorMessage={this.state.assignOnError} />

                        <input
                            type="submit"
                            value="Submit"
                            disabled={pendingTickets.length === 0}
                        />
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
