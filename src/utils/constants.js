/** @format */

// Accedi alle variabili d'ambiente usando import.meta.env
const clientUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_CLIENT_PRODUCTION_URL : import.meta.env.VITE_CLIENT_LOCAL_PORT;

const serverUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_PRODUCTION_URL : import.meta.env.VITE_API_LOCAL_PORT;

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
		value: 'Fela, il mio dio vivente',
		label: 'Fela, il mio dio vivente',
	},
	{
		value: 'Lucania',
		label: 'Lucania',
	},
];

export { clientUrl, serverUrl, optionsFilms, optionsArticles };
