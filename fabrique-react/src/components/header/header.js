import Navigation from '../nav/nav';
import classes from './header.module.scss';

const Header = () => {
    return(
        <header className={classes.header}>
            <div className={classes.header__container}>
                <Navigation />
            </div>
        </header>
    )
}

export default Header;