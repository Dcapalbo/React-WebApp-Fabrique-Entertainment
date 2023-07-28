/** @format */

const decodeToken = (token) => {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	return JSON.parse(jsonPayload);
};

const slugCreation = (string) => {
	return string.toLowerCase().replaceAll(' ', '-');
};

const handlePressBookDownload = (url) => {
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', true);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const handleSingleImageDelete = async (imageKey, url) => {
	try {
		const response = await axios.delete(
			`${url}/delete-image?image_key=${imageKey}`
		);

		if (response.status === 200) {
			console.log(response);
			dispatch(dataFilmActions.removeImageKey(imageKey));
		} else {
			console.log('Error deleting image:', response.data.message);
		}
	} catch (error) {
		console.error('Error deleting image:', error);
	}
};

export {
	decodeToken,
	slugCreation,
	handlePressBookDownload,
	handleSingleImageDelete,
};
