import classes from "./filterDataSelect.module.scss";
import React from "react";

const FilterDataSelect = ({ onChange, value }) => {
  const options = [
    {
      value: "",
      label: "Tutti",
    },
    {
      value: "Lungometraggio",
      label: "Lungometraggio",
    },
    {
      value: "Cortometraggio",
      label: "Cortometraggio",
    },
    {
      value: "Documentario",
      label: "Documentario",
    },
  ];

  return (
    <div className={classes.wrapper__filter__data__select}>
      <label>Filtra i risultati</label>
      <select
        className={classes.filter__data__select}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <h3>Filmografia</h3>
    </div>
  );
};

export default FilterDataSelect;
