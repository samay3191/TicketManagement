import { SET_NAVIGATION } from "../constants/actionTypes";

export function setNavigation(page) {
    return { type: SET_NAVIGATION, payload: page };
};
