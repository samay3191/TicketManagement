import { ADD_TICKET, GET_TICKET, GET_ALL_TICKETS, UPDATE_TICKET } from "../constants/actionTypes";
import * as _ from 'lodash';

const initialState = {
    tickets: [],
    selectedTicket: null,
    assignmentError: ""
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
            const newState = { ...state };
            const updatedTicket = action.payload;
            const tickets = updateObjectInArray(newState.tickets, updatedTicket);
            return {
                ...newState,
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

function updateObjectInArray(tickets, updatedTicket) {
    return tickets.map((ticket) => {
      if (ticket.ticketId !== updatedTicket.ticketId) {
        return {...ticket};
      }
      return {
        ...ticket,
        ...updatedTicket
      }
    });
  }

export default ticketReducer;