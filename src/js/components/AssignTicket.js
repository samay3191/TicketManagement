import React, { Component } from 'react';
import { getTodaysDate } from '../Utils/CommonMethods';
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

class AssignTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingTicket: "",
            assignTo: "",
            assignOn: "",
            pendingTicketError: "",
            assignToError: "",
            assignOnError: "",
        }
    }

    componentWillMount() {
        this.props.getAllTickets();
    }

    onTextChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    };

    assignTicket = async (event) => {
        event.preventDefault();
        const ticket = _.find(this.props.tickets, { ticketId: this.state.pendingTicket });
        const updatedTicket = _.assign({}, ticket, {
            assignedTo: this.state.assignTo,
            assignedOn: this.state.assignOn
        });
        await this.props.updateTicket(updatedTicket);
        hashHistory.push("/TicketList");
    };

    render() {
        return (
            <div style={{ width: "50%" }}>
                <div><h3>Assign Ticket</h3></div>
                <div className="TicketForm">
                    <form name="AssignTicketForm" onSubmit={this.assigneTicket} >
                        <label htmlFor="pendingTickets">Pending Tickets</label>
                        <select
                            id="pendingTicket"
                            name="pendingTicket"
                            value={this.state.pendingTicket}
                            onChange={this.onTextChange}
                        >
                            { this.props.tickets.length > 0 &&
                                this.props.tickets.map( ticket => {
                                    return <option value="australia">{`${ticket.empName} - ${ticket.issueType}`}</option>
                                })
                            }
                        </select>

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

                        <label htmlFor="assignOn">Assign On</label>
                        <input
                            type="date"
                            id="assignOn"
                            name="assignOn"
                            min={getTodaysDate()}
                            value={this.state.assignOn}
                            onChange={this.onTextChange}
                        />
                    
                        <input type="submit" value="Assign" />
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
