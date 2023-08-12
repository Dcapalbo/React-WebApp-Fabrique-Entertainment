/** @format */

import React from 'react';

const DynamicInput = ({
	index,
	fieldValue,
	isRequired,
	register,
	handleDynamicFieldChange,
	handleDynamicFieldDelete,
	errors,
	label,
	fieldName,
	name,
	className,
	buttonClassName,
	stateArray,
	setState,
	deleteButtonLabel,
}) => {
	return (
		<div className={className}>
			<label htmlFor={name}>
				{label}
				{isRequired && <span>*</span>}
			</label>
			<input
				defaultValue={fieldValue}
				{...register(`${name}.${index}.${fieldName}`)}
				type='text'
				onChange={(e) =>
					handleDynamicFieldChange(e, index, fieldName, stateArray, setState)
				}
			/>
			{errors[name]?.[index]?.[fieldName]?.message && (
				<small>{errors[name]?.[index]?.[fieldName]?.message}</small>
			)}
			{index !== 0 && (
				<button
					onClick={() => handleDynamicFieldDelete(index, stateArray, setState)}
					className={buttonClassName}
					type='button'>
					{deleteButtonLabel}
				</button>
			)}
		</div>
	);
};

export default DynamicInput;
