/** @format */

import classes from './header.module.scss';
import NavBar from '../UI/nav/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

const Header = () => {
	const [sticky, setSticky] = useState(false);

	useEffect(() => {
		const isSticky = () => {
			if (window.scrollY >= 170) {
				setSticky(true);
			} else {
				setSticky(false);
			}
		};
		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	}, []);

	return (
		<header className={sticky ? classes.sticky : classes.header}>
			<NavBar />
		</header>
	);
};

export default Header;
