import { FILTER_COUNTRIES } from "../constants/actionTypes";

const initialState = {
    countries: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case FILTER_COUNTRIES:
        {
            const countries = action.payload || [];
            return { countries };
        }
        default:
            return state;
    }
};

export default rootReducer;