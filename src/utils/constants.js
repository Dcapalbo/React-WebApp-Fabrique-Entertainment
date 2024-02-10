/** @format */

const clientUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PRODUCTION_URL
		: process.env.REACT_APP_CLIENT_LOCAL_PORT;

const serverUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_API_PRODUCTION_URL
		: process.env.REACT_APP_API_LOCAL_PORT;
		
const optionsFilms = [
	{
		value: '',
		label: 'Tutti',
	},
	{
		value: 'Lungometraggio',
		label: 'Lungometraggio',
	},
	{
		value: 'Cortometraggio',
		label: 'Cortometraggio',
	},
	{
		value: 'Documentario',
		label: 'Documentario',
	},
];

const optionsArticles = [
	{
		value: '',
		label: 'Tutti',
	},
	{
		value: 'Fela. il mio dio vivente',
		label: 'Fela. il mio dio vivente',
	},
	{
		value: 'Lucania',
		label: 'Lucania',
	},
];

export { clientUrl, serverUrl, optionsFilms, optionsArticles };
