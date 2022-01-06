import classes from './nav.module.scss';

const Navigation = () => {
    return(
        <nav>
            <ul className={classes.navigation}>
                <li className={classes.li}>
                    <a href="/">Home</a>
                </li>
                <li className={classes.li}>
                    <a href="/">About</a>
                </li>
                <li className={classes.li}>
                    <a href="/">Films</a>
                </li>
                <li className={classes.li}>
                    <a href="/">News</a>
                </li>
                <li className={classes.li}>
                    <a href="/">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;