/** @format */

import { dataUserActions } from '../../../store/data-user-slice';
import { FaFlag, FaFlagUsa, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './navLinks.module.scss';
import i18n from 'i18next';

const NavLinks = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
	const token = useSelector((state) => state.userLogin.token);
	const name = useSelector((state) => state.userLogin.name);

	useEffect(() => {
		setIsAuthenticated(isLoggedIn);
	}, [isLoggedIn, token]);

	const logout = () => {
		dispatch(dataUserActions.logout());
		navigate('/login');
	};

	return (
		<ul className={classes.nav__links}>
			{isAuthenticated && (
				<li className={classes.nav__links__user__logged}>
					<Link to='/admin/films'>
						<FaUser />
					</Link>
					<p>{name}</p>
				</li>
			)}
			<li>
				<Link to='/'>{t('home')}</Link>
			</li>
			<li>
				<Link to='/films'>{t('films')}</Link>
			</li>
			<li>
				<Link to='/news'>{t('news')}</Link>
			</li>
			<li>
				<Link to='/about'>{t('about')}</Link>
			</li>
			<li>
				<Link to='/contacts'>{t('contacts')}</Link>
			</li>
			{isAuthenticated && (
				<>
					<li>
						<Link to='/admin/films'>{t('filmsList')}</Link>
					</li>
					<li>
						<Link to='/admin/add-new-film'>{t('addFilm')}</Link>
					</li>
					<li>
						<Link to='/admin/contacts'>{t('contactsList')}</Link>
					</li>
					<li>
						<Link to='/admin/add-new-contact'>{t('addContact')}</Link>
					</li>
					<li>
						<Link to='/admin/add-new-article'>{t('addArticle')}</Link>
					</li>
					<li>
						<Link to='/forgot-password'>{t('forgotPassword')}</Link>
					</li>
				</>
			)}
			{isAuthenticated && (
				<li>
					<p onClick={logout}>Logout</p>
				</li>
			)}
			{/* {i18n.language === 'it' ? (
				<li>
					<FaFlagUsa
						onClick={() => i18n.changeLanguage('en')}
					/>
				</li>
			) : (
				<li>
					<FaFlag
						onClick={() => i18n.changeLanguage('it')}
					/>
				</li>
			)} */}
		</ul>
	);
};

export default NavLinks;
