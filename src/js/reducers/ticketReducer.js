import { ADD_TICKET, GET_TICKET, GET_ALL_TICKETS, UPDATE_TICKET } from "../constants/actionTypes";
import * as _ from 'lodash';

const initialState = {
    tickets: [],
    selectedTicket: null
};

const ticketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TICKET:
        {
            const tickets = state.tickets;
            tickets.push(action.payload);
            return {
                ...state,
                tickets
            };
        }
        case UPDATE_TICKET:
        {
            const updatedTicket = action.payload;
            const tickets = state.tickets.map(ticket => {
                if (ticket.ticketId === updatedTicket.ticketId) {
                    return updatedTicket;
                }
                return ticket;
            });
            return {
                ...state,
                tickets
            };
        }
        case GET_TICKET:
        {
            const ticketId = action.payload;
            const selectedTicket = _.find(state.tickets, { ticketId: ticketId });
            return {
                ...state,
                selectedTicket
            };
        }
        case GET_ALL_TICKETS:
        default:
            return state;
    }
};

export default ticketReducer;