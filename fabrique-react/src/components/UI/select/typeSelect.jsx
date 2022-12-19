import React from "react";

const TypeSelect = (props) => {
  const options = [
    {
      value: "lungometraggio",
      label: "Lungometraggio",
    },
    {
      value: "cortometraggio",
      label: "Cortometraggio",
    },
    {
      value: "documentario",
      label: "Documentario",
    },
  ];

  return (
    <select
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      className={props.style}
      value={props.value}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TypeSelect;
