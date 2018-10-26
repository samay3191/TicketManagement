import React, { Component } from 'react';

export default class TicketList extends Component {
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
                            </tr>
                        </thead>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}