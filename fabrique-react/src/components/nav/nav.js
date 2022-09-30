import logo from '../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';
import { Link } from 'react-router-dom';
import classes from './nav.module.scss';

const Navigation = () => {
        return(
            <nav className={classes.navigation}>
                <a href="/">
                    <img className={classes.navigation__logo} src={logo} alt="logo fabrique entertainment" />
                </a>
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
                            <li><Link to="/films/lucania">lucania</Link></li>
                            <li><Link to="/films/guerrieri">guerrieri</Link></li>
                            <li><Link to="/films/love-and-desire">love and desire</Link></li>
                            <li><Link to="/films/felakuti">felakuti</Link></li>
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