import * as _ from "lodash";
import { ADD_TICKET, GET_TICKET, GET_ALL_TICKETS } from "../constants/actionTypes";

export const addTicket = ticket => {
    return { type: ADD_TICKET, payload: ticket }
};
