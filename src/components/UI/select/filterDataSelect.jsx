import classes from "./filterDataSelect.module.scss";
import React from "react";

const FilterDataSelect = ({ onChange, options, label, headline }) => {
  return (
    <div className={classes.wrapper__filter__data__select}>
      <label>{label}</label>
      <select
        className={classes.filter__data__select}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <h3>{headline}</h3>
    </div>
  );
};

export default FilterDataSelect;
