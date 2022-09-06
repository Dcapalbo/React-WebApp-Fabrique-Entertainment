import Navigation from '../nav/nav';
import NavigationMobile from '../nav/navMobile';
import classes from './header.module.scss';

const Header = () => {
    let domWidth = window.innerWidth;
    return(
        <header className={classes.header}>
            <div className={classes.header__container}>
                {domWidth >= 767 && <Navigation />}
                {domWidth <= 767 && <NavigationMobile/>}   
            </div>
        </header>
    )
}

export default Header;