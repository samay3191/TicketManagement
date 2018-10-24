import React, { Fragment } from "react";

const CountryList = ({ countries, selectedIndex, setCountry }) => {
  return (
    <Fragment>
      {countries.length > 0 ?
        <div className="CountryList">
          <ul>
            {countries.map((country, index) => {
              const listClass = selectedIndex === index ? "SelectedListItem" : "ListItem";
              return (
                <li
                  key={country.code}
                  className={listClass}
                  onClick={() => setCountry(country.name)}
                >
                  {country.name}
                </li>
              )
            })}
          </ul>
        </div>
        :
        <p>No matching country found.</p>
      }
    </Fragment>
  )
};

export default CountryList;