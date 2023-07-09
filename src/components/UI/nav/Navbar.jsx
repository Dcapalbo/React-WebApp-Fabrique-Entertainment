/** @format */

import MobileNavigation from './MobileNavigation';
import classes from './navBar.module.scss';
import Navigation from './Navigation';

const NavBar = () => {
	return (
		<>
			<div className={classes.flex__wrapper}>
				<Navigation />
				<MobileNavigation />
			</div>
		</>
	);
};

export default NavBar;
