import { SET_NAVIGATION } from "../constants/actionTypes";

const initialState = {
    activePage: ""
};

const navigationReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NAVIGATION:
        {
            return {
                activePage: action.payload
            };
        }
        default:
            return state;
    }
};

export default navigationReducer;
