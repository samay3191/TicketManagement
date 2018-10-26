import store from "./store/index";
import { filterCountries } from "./actions/ticketActions";

window.store = store;
window.filterCountries = filterCountries;