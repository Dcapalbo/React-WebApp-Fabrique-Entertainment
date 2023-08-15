/** @format */

import React from 'react';

const FestivalTypeSelect = ({ onChange, value }) => {
	const options = [
		{ value: '', label: '' },
		{ value: 'selezione', label: 'Selezione' },
		{ value: 'premio', label: 'Premio' },
	];

	return (
		<select
			onChange={onChange}
			value={value}>
			{options.map((option, index) => (
				<option
					key={index}
					value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default FestivalTypeSelect;
