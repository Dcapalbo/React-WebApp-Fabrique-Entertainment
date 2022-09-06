import classes from './navmobile.module.scss';
import logo from '../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';

const NavigationMobile = () => {
        return(
            <>
                <nav className={classes.navigation__mobile}>
                    <a href="/">
                        <img className={classes.navigation__logo} src={logo} alt="logo fabrique entertainment" />
                    </a>
                </nav>
            </>
        )
}

export default NavigationMobile;