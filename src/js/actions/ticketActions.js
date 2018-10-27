import { ADD_TICKET, GET_TICKET, GET_ALL_TICKETS, UPDATE_TICKET } from "../constants/actionTypes";

export function addTicket(ticket) {
    return { type: ADD_TICKET, payload: ticket }
};

export function updateTicket (ticket) {
    return { type: UPDATE_TICKET, payload: ticket }
};

export function getTicket (ticketId) {
    return { type: GET_TICKET, payload: ticketId }
};

export function getAllTickets() {
    return { type: GET_ALL_TICKETS, payload: null }
};
