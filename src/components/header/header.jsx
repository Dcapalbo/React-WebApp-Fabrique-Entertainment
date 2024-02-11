/** @format */

import React, { useEffect, useState } from 'react';
import classes from './header.module.scss';
import NavBar from '../UI/nav/Navbar';

const Header = () => {
	const [sticky, setSticky] = useState(false);

	useEffect(() => {
		const isSticky = () => {
			if (window.scrollY >= 100) {
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
