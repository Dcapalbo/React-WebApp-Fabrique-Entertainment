import React from "react";

const GenreSelect = ({ onChange, value }) => {
    const options = [
		{ value: '', label: '' },
		{ value: 'action', label: 'Azione' },
		{ value: 'comedy', label: 'Commedia' },
		{ value: 'drama', label: 'Drammatico' },
		{ value: 'horror', label: 'Horror' },
		{ value: 'romance', label: 'Romantico' },
		{ value: 'sci-fi', label: 'Fantascienza' },
		{ value: 'thriller', label: 'Thriller' },
		{ value: 'adventure', label: 'Avventura' },
		{ value: 'animation', label: 'Animazione' },
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
