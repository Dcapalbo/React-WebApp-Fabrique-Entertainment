/** @format */

import React from 'react';

const TruncatedText = ({ text, maxLength }) => {
	const isTextTooLong = text.length > maxLength;
	const truncatedText = isTextTooLong ? text.slice(0, maxLength) : text;

	return (
		<div>
			{truncatedText}
			{isTextTooLong && '...'}{' '}
		</div>
	);
};

export default TruncatedText;
