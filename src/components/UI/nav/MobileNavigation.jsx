/** @format */

import logo from '../../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';
import classes from './mobileNavigation.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useState } from 'react';
import React from 'react';

const MobileNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openMobileMenu = () => {
		setIsOpen(!isOpen);
	};

	const hamburgher = (
		<FaBars
			className={classes.hamburgher}
			onClick={openMobileMenu}
		/>
	);

	const closeButton = (
		<FaTimes
			className={classes.cross__button}
			onClick={openMobileMenu}
		/>
	);

	return (
		<nav
			className={
				isOpen
					? classes.clicked__mobile__navigation
					: classes.mobile__navigation
			}>
			{!isOpen && (
				<Link to='/'>
					<img
						className={classes.brand__logo}
						title='logo fabrique'
						alt='logo fabrique'
						src={logo}
					/>
				</Link>
			)}
			{isOpen ? closeButton : hamburgher}
			{isOpen && <NavLinks />}
		</nav>
	);
};

export default MobileNavigation;
