/** @format */

import React from 'react';

const TagSelect = ({ onChange, value }) => {
	const options = [
		{ value: '', label: 'Seleziona un opzione' },
		{ value: 'Fela, il mio dio vivente', label: 'Fela, il mio dio vivente' },
		{ value: 'Lucania', label: 'Lucania' },
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

export default TagSelect;
