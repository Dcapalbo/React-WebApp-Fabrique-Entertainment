/** @format */

// importing the react router dom version 6
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
// importing the react traductions functions
import { initReactI18next } from 'react-i18next';
import { translationIt } from './utils/i18It';
import { translationEn } from './utils/i18En';
import { serverUrl } from './utils/constants';
import ApiGetHook from './hooks/apiGetHook';
import i18n from 'i18next';
// redux states
import { dataContactActions } from './store/data-contact-slice';
import ScrollTop from './components/UI/scrollTop/scrollTop';
// scss files
import './assets/typography.scss';
import './assets/reset.scss';
// pages
import Home from './pages/Home';
import Film from './pages/Film';
import News from './pages/News';
import About from './pages/About';
import Films from './pages/Films';
import NewFilm from './pages/NewFilm';
import Contacts from './pages/Contacts';
import LoginForm from './pages/LoginForm';
import UpdateFilm from './pages/UpdateFilm';
// import AuthSignUp from './pages/AuthSignUp';
import NewContact from './pages/NewContact';
import AllAuthFilms from './pages/AllAuthFilms';
import AboutContact from './pages/AboutContact';
import UpdateContact from './pages/UpdateContact';
import AllAuthContacts from './pages/AllAuthContacts';
import ResetPasswordForm from './pages/ResetPassword';
import ForgotPasswordForm from './pages/ForgotPassword';
import NewArticle from './pages/NewArticle';
import UpdateArticle from './pages/UpdateArticle';

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

const App = () => {
	const dispatch = useDispatch();

	const { contacts } = ApiGetHook(`${serverUrl}/get-contacts`);

	const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
	const token = useSelector((state) => state.userLogin.token);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		setIsAuthenticated(isLoggedIn);
		dispatch(dataContactActions.setContactsData(contacts));
	}, [isLoggedIn, token, dispatch, contacts]);
	return (
		<Router>
			<ScrollTop />
			<Routes>
				{/* not authenticated Routes  */}
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/news'
					element={<News />}
				/>
				<Route
					path='/films'
					element={<Films />}
				/>
				<Route
					path='/contacts'
					element={<Contacts />}
				/>
				<Route
					path='/film/:slug'
					element={<Film />}
				/>
				<Route
					path='/about/:slug'
					element={<AboutContact />}
				/>
				<Route
					path='/login'
					element={<LoginForm />}
				/>
				<Route
					path='/reset-password'
					element={<ResetPasswordForm />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPasswordForm />}
				/>
				{/* <Route
					path='/sign-up'
					element={<AuthSignUp />}
				/> */}
				{/* authenticated Routes  */}
				<Route
					path='/admin/films'
					element={
						isAuthenticated ? (
							<AllAuthFilms />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/contacts'
					element={
						isAuthenticated ? (
							<AllAuthContacts />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/add-new-film'
					element={
						isAuthenticated ? (
							<NewFilm />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/update-film'
					element={
						isAuthenticated ? (
							<UpdateFilm />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/add-new-contact'
					element={
						isAuthenticated ? (
							<NewContact />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/update-contact'
					element={
						isAuthenticated ? (
							<UpdateContact />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/add-new-article'
					element={
						isAuthenticated ? (
							<NewArticle />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/admin/update-article'
					element={
						isAuthenticated ? (
							<UpdateArticle />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to='/'
							replace
						/>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
