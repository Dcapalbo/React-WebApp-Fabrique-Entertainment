/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';

const useApiGetHook = (url) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				setData(response.data);
				setError(null);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return { data, error, loading };
};

export default useApiGetHook;
