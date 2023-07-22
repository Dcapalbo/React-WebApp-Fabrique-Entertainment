import React from "react";

const GenreSelect = ({ onChange, value }) => {
    const options = [
		{ value: '', label: '' },
		{ value: 'azione', label: 'Azione' },
		{ value: 'commedia', label: 'Commedia' },
		{ value: 'drammatico', label: 'Drammatico' },
		{ value: 'horror', label: 'Horror' },
		{ value: 'romantico', label: 'Romantico' },
		{ value: 'sci-fi', label: 'Fantascienza' },
		{ value: 'thriller', label: 'Thriller' },
		{ value: 'avventura', label: 'Avventura' },
		{ value: 'animazione', label: 'Animazione' },
		{ value: 'fantasy', label: 'Fantasy' },
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

export default GenreSelect;
