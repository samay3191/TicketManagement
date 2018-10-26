import React, { Component } from 'react';
import { getTodaysDate } from '../Utils/CommonMethods';

export default class AssignTicket extends Component {
    render() {
        return (
            <div style={{ width: "50%" }}>
                <div><h3>Assign Ticket</h3></div>
                <div className="TicketForm">

                    <label htmlFor="pendingTickets">Pending Tickets</label>
                    <select
                        id="pendingTickets"
                        name="pendingTickets"
                        value={this.state.pendingTickets}
                    >
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                    </select>

                    <label htmlFor="assignTo">Assign To</label>
                    <select
                        id="assignTo"
                        name="assignTo"
                        value={this.state.assignTo}
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
                    />
                
                    <input type="submit" value="Assign" />
                </div>
            </div>
        );
    }
}