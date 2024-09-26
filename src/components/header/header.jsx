/** @format */

import classes from './header.module.scss';
import NavBar from '../UI/nav/Navbar';

const Header = () => {
	return (
		<header className={classes.header}>
			<NavBar />
		</header>
	);
};

export default Header;
