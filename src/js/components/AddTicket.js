import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as uuid from 'uuid';
import { getTodaysDate } from '../Utils/CommonMethods';
import * as actions from '../actions/ticketActions';

const mapStateToProps = state => {
    return {
        tickets: state.tickets,
        selectedTicket: state.selectedTicket
    };
};
  
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class AddTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empName: "",
            empEmail: "",
            empPhone: "",
            issueType: "",
            issueDescription: "",
            issueDate: "",
            empNameError: "",
            empEmailError: "",
            empPhoneError: ""
        }
    }

    onTextChange = event => {
        this.setState({ [event.target.name] : [event.target.value] });
    }

    submitTicket = () => {
        const ticket = this.createTicketObject();
        this.props.addTicket(ticket);
    }

    createTicketObject = () => {
        const ticketId = uuid.v4();
        const {
            empName,
            empEmail,
            empPhone,
            issueType,
            issueDescription,
            issueDate
        } = this.state;
        const ticketObject = {
            ticketId,
            empName,
            empEmail,
            empPhone,
            issueType,
            issueDescription,
            issueDate
        };
        return ticketObject;
    }

    render() {
        return (
            <div style={{ width: "50%" }}>
                <div><h3>Add Ticket</h3></div>
                <div className="TicketForm">
                    <form name="SupportTicketForm" onSubmit={this.submitTicket} >
                        <label htmlFor="empName">Name</label>
                        <input
                            type="text"
                            id="empName"
                            name="empName"
                            placeholder="Your name.."
                            patter="[A-Za-z]"
                            value={this.state.empName}
                            onChange={this.onTextChange}
                        />

                        <label htmlFor="empEmail">Email</label>
                        <input
                            type="email"
                            id="empEmail"
                            name="empEmail"
                            placeholder="Enter email id"
                            value={this.state.empEmail}
                            onChange={this.onTextChange}
                        />

                        <label htmlFor="empPhone">Phone (Mobile)</label>
                        <input
                            type="text"
                            id="empPhone"
                            name="empPhone"
                            placeholder="Enter Phone Number"
                            pattern="[0-9]{10}"
                            value={this.state.empPhone}
                            onChange={this.onTextChange}
                        />

                        <label htmlFor="issueType">Issue</label>
                        <select
                            id="issueType"
                            name="issueType"
                            value={this.state.issueType}
                            onChange={this.onTextChange}
                        >
                            <option value="Software Installation">Software Installation</option>
                            <option value="URL Access Required">URL Access Required</option>
                            <option value="Streaming Access Required">Streaming Access Required</option>
                            <option value="Desktop Issue">Desktop Issue</option>
                            <option value="Laptop Issue">Laptop Issue</option>
                            <option value="Hardware Requirement">Hardware Requirement</option>
                            <option value="Others">Others</option>
                        </select>

                        <label htmlFor="issueDescription">Description</label>
                        <textarea
                            id="issueDescription"
                            name="issueDescription"
                            placeholder="Describe your issue here.."
                            value={this.state.issueDescription}
                            onChange={this.onTextChange}
                        />

                        <label htmlFor="issueDate">Issue Date</label>
                        <input
                            type="date"
                            id="issueDate"
                            name="issueDate"
                            min={getTodaysDate()}
                            value={this.state.issueDate}
                            onChange={this.onTextChange}
                        />
                    
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

AddTicket.prototype = {
    tickets: PropTypes.array,
    selectedTicket: PropTypes.node
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);