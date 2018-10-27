import { combineReducers } from "redux";
import ticketReducer from './ticketReducer';
import navigationReducer from './navigationReducer';

const rootReducer = combineReducers({
    ticketReducer,
    navigationReducer
});

export default rootReducer;