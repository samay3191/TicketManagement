import { ADD_TICKET, GET_TICKET, GET_ALL_TICKETS, UPDATE_TICKET } from "../constants/actionTypes";

export const addTicket = ticket => {
    return { type: ADD_TICKET, payload: ticket }
};

export const updateTicket = ticket => {
    return { type: UPDATE_TICKET, payload: ticket }
};

export const getTicket = ticketId => {
    return { type: GET_TICKET, payload: ticketId }
};

export const getAllTickets = () => {
    return { type: GET_ALL_TICKETS, payload: null }
};
