import classes from './nav.module.scss';

const Navigation = () => {
    return(
        <nav>
            <ul className={classes.navigation}>
                <li>
                    <a href="/">home</a>
                </li>
                <li>
                    <a href="/about">about</a>
                </li>
                <li>
                    <a className={classes.navigation__films} href="/films">films</a>
                    <ul className={classes.navigation__films__dropdown}>
                        <li><a href="/films/lucania">lucania</a></li>
                        <li><a href="/films/guerrieri">guerrieri</a></li>
                        <li><a href="/films/love-and-desire">love and desire</a></li>
                        <li><a href="/films/felakuti">felakuti</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/news">news</a>
                </li>
                <li>
                    <a href="/contact">contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;