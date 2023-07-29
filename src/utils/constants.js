/** @format */

const clientUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PRODUCTION_URL
		: process.env.REACT_APP_CLIENT_LOCAL_PORT;

const serverUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_API_PRODUCTION_URL
		: process.env.REACT_APP_API_LOCAL_PORT;

export { clientUrl, serverUrl };
