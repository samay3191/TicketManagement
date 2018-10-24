import store from "./store/index";
import { filterCountries } from "./actions/filterActions";

window.store = store;
window.filterCountries = filterCountries;