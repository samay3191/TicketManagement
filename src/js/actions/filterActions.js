import * as _ from "lodash";
import { FILTER_COUNTRIES } from "../constants/actionTypes";

const allCountries = require("../../resources/countries.json");

export const filterCountries = keyword => {
    let filteredCountries = allCountries;
    if (keyword) {
        filteredCountries = _.filter(allCountries, country => {
            const countryName = country.name.toLowerCase();
            const searchTerm = keyword.toLowerCase();
            return _.startsWith(countryName, searchTerm);            
        });
    }
    return { type: FILTER_COUNTRIES, payload: filteredCountries }
};