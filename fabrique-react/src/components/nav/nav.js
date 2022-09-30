import logo from '../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';
import { Link, useParams } from 'react-router-dom';
import classes from './nav.module.scss';

const Navigation = () => {
    let { film } = useParams();
        return(
            <nav className={classes.navigation}>
                <a href="/">
                    <img className={classes.navigation__logo} src={logo} alt="logo fabrique entertainment" />
                </a>
                <ul className={classes.navigation}>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <a className={classes.navigation__films} href="/films">films</a>
                        <ul className={classes.navigation__films__dropdown}>
                            <li><Link to="/films/:film">lucania</Link></li>
                            <li><Link to="/films/:film">guerrieri</Link></li>
                            <li><Link to="/films/:film">love and desire</Link></li>
                            <li><Link to="/films/:film">felakuti</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/news">news</Link>
                    </li>
                    <li>
                        <Link to="/contact">contact</Link>
                    </li>
                </ul>
            </nav>
        )
    }

export default Navigation;