/** @format */

import logo from '../../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';
import classes from './navigation.module.scss';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import React from 'react';

const Navigation = () => {
	return (
		<nav className={classes.navigation}>
			<Link to='/'>
				<img
					className={classes.brand__logo}
					title='logo fabrique'
					alt='logo fabrique'
					src={logo}
				/>
			</Link>
			<NavLinks />
		</nav>
	);
};

export default Navigation;
