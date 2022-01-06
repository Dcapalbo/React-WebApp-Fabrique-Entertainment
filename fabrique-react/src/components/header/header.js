import Navigation from '../nav/nav';
import classes from './header.module.scss';

const Header = () => {
    return(
        <header className={classes.header}>
            <Navigation />
        </header>
    )
}

export default Header;