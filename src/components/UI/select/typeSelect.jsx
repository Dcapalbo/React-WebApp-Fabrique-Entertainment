import React from "react";

const TypeSelect = ({ onChange, value }) => {
  const options = [
		{
			value: '',
			label: 'Seleziona una tipologia',
		},
		{
			value: 'Lungometraggio',
			label: 'Lungometraggio',
		},
		{
			value: 'Cortometraggio',
			label: 'Cortometraggio',
		},
		{
			value: 'Documentario',
			label: 'Documentario',
		},
	];

  return (
    <select onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TypeSelect;
