import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { hashHistory } from 'react-router';
import { bindActionCreators } from "redux";
import * as uuid from 'uuid';
import { getTodaysDate } from '../Utils/CommonMethods';
import rootActions from '../actions/index';
import ErrorBlock from './ErrorBlock';

const mapStateToProps = state => {
    return {
        tickets: state.ticketReducer.tickets,
        selectedTicket: state.ticketReducer.selectedTicket
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(rootActions, dispatch);

class AddTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empName: "",
            empEmail: "",
            empPhone: "",
            issueType: "Software Installation",
            issueDescription: "",
            issueDate: getTodaysDate(),
            empNameError: "",
            empEmailError: "",
            empPhoneError: "",
            issueDateError: ""
        }
    };

    componentWillMount() {
        this.props.setNavigation("AddTicket");
    }

    onTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    checkValidity = (form) => {
        let isValid = true;
        const count = form.length;
        for (let i = 0; i < count; i++) {
            if (!form[i].validity.valid) {
                isValid = false;
                this.setState({ [form[i].name + "Error"]: "Please provide valid information" });
            } else {
                this.setState({ [form[i].name + "Error"]: "" });
            }
        }
        return isValid;
    };

    submitTicket = async (event) => {
        event.preventDefault();
        if (this.checkValidity(event.target)) {
            const ticket = this.createTicketObject();
            await this.props.addTicket(ticket);
            hashHistory.push("/TicketList");
        }
    };

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
            issueDate,
            assignedTo: "",
            assignedOn: "",
            isCompleted: false,
            isDeleted: false
        };
        return ticketObject;
    };

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
                            required
                        />
                        <ErrorBlock errorMessage={this.state.empNameError} />

                        <label htmlFor="empEmail">Email</label>
                        <input
                            type="email"
                            id="empEmail"
                            name="empEmail"
                            placeholder="Enter email id"
                            value={this.state.empEmail}
                            onChange={this.onTextChange}
                            required
                        />
                        <ErrorBlock errorMessage={this.state.empEmailError} />

                        <label htmlFor="empPhone">Phone (Mobile)</label>
                        <input
                            type="text"
                            id="empPhone"
                            name="empPhone"
                            placeholder="Enter Phone Number"
                            pattern="[0-9]{10}"
                            value={this.state.empPhone}
                            onChange={this.onTextChange}
                            required
                        />
                        <ErrorBlock errorMessage={this.state.empPhoneError} />

                        <label htmlFor="issueType">Issue</label>
                        <select
                            id="issueType"
                            name="issueType"
                            value={this.state.issueType}
                            onChange={this.onTextChange}
                            required
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
                            required
                        />

                        <label htmlFor="issueDate">Issue Date</label>
                        <input
                            type="date"
                            id="issueDate"
                            name="issueDate"
                            min={getTodaysDate()}
                            value={this.state.issueDate}
                            onChange={this.onTextChange}
                            required
                        />
                        <ErrorBlock errorMessage={this.state.issueDateError} />

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

AddTicket.propTypes = {
    tickets: PropTypes.array,
    selectedTicket: PropTypes.node
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTicket);