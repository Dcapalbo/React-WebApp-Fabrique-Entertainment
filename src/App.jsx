/** @format */
import { dataContactActions } from './store/data-contact-slice';
import ScrollTop from './components/UI/scrollTop/scrollTop';
import { BrowserRouter as Router } from 'react-router-dom';
import { serverUrl } from './utils/constants';
import ApiGetHook from './hooks/apiGetHook';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
//scss files
import './assets/typography.scss';
import './assets/reset.scss';
//translation
import { initReactI18next } from 'react-i18next';
import { translationIt } from './utils/i18It';
import { translationEn } from './utils/i18En';
import i18n from 'i18next';

// initialize the react traductions
i18n.use(initReactI18next).init({
	resources: {
		it: { translation: translationIt },
		en: { translation: translationEn },
	},
	lng: 'it',
	fallbackLng: 'it',
	interpolation: { escapeValue: false },
});

// Importazione e configurazione di i18n omessa per brevità
// ...

const App = () => {
	const dispatch = useDispatch();
	const { contacts } = ApiGetHook(`${serverUrl}/get-contacts`);

	useEffect(() => {
		dispatch(dataContactActions.setContactsData(contacts));
	}, [dispatch, contacts]);

	return (
		<Router>
			<ScrollTop />
			<AppRoutes />
		</Router>
	);
};

export default App;
