/** @format */

import React from 'react';

const ProjectStateSelect = ({ onChange, value }) => {
	const options = [
		{ value: '', label: 'Inserisci un valore' },
		{ value: 'pre-produzione', label: 'Pre-produzione' },
		{ value: 'post-produzione', label: 'Post-produzione' },
		{ value: 'completato', label: 'Completato' },
		{ value: 'uscito', label: 'Uscito' },
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

export default ProjectStateSelect;
