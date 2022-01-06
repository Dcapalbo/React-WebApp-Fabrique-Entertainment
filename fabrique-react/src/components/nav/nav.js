import classes from './nav.module.scss';

const Navigation = () => {
    return(
        <nav>
            <ul className={classes.navigation}>
                <li>
                    <a href="/">home</a>
                </li>
                <li>
                    <a href="/">about</a>
                </li>
                <li>
                    <a className={classes.navigation__films} href="/">films</a>
                    <ul className={classes.navigation__films__dropdown}>
                        <li><a href="/">lucania</a></li>
                        <li><a href="/">guerrieri</a></li>
                        <li><a href="/">love and desire</a></li>
                        <li><a href="/">felakuti</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/">news</a>
                </li>
                <li>
                    <a href="/">contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;