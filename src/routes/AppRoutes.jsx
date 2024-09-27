/** @format */
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';

const ForgotPasswordForm = React.lazy(() => import('../pages/ForgotPassword'));
const ResetPasswordForm = React.lazy(() => import('../pages/ResetPassword'));
const AllAuthContacts = React.lazy(() => import('../pages/AllAuthContacts'));
const UpdateContact = React.lazy(() => import('../pages/UpdateContact'));
const UpdateArticle = React.lazy(() => import('../pages/UpdateArticle'));
const AboutContact = React.lazy(() => import('../pages/AboutContact'));
const AllAuthFilms = React.lazy(() => import('../pages/AllAuthFilms'));
const UpdateFilm = React.lazy(() => import('../pages/UpdateFilm'));
const NewContact = React.lazy(() => import('../pages/NewContact'));
const NewArticle = React.lazy(() => import('../pages/NewArticle'));
const LoginForm = React.lazy(() => import('../pages/LoginForm'));
const Contacts = React.lazy(() => import('../pages/Contacts'));
const NewFilm = React.lazy(() => import('../pages/NewFilm'));
const About = React.lazy(() => import('../pages/About'));
const Films = React.lazy(() => import('../pages/Films'));
const Home = React.lazy(() => import('../pages/Home'));
const News = React.lazy(() => import('../pages/News'));
const Film = React.lazy(() => import('../pages/Film'));

const AppRoutes = () => {
	const isAuth = useSelector((state) => state.dataUser);
	const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

	useEffect(() => {
		setIsAuthenticated(isAuth);
	}, [isAuth, isAuthenticated]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{' '}
			{/* Fallback per il caricamento */}
			<Routes>
				{/* Not Authenticated Routes */}
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

				{/* Authenticated Routes */}
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

				{/* Catch-all Route */}
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
		</Suspense>
	);
};

export default AppRoutes;
