import classes from './navmobile.module.scss';
import { useState } from 'react';
import logo from '../../assets/img/LOGO_Fabrique_Entertainment_White_PNG.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const NavigationMobile = () => {

    const [visible, setIsVisible] = useState(false);
    const handlerMobilemenu = () => {
        setIsVisible(true);
    }
        return(
            <>
                <nav className={classes.navigation__mobile}>
                    <a href="/">
                        <img className={classes.navigation__logo} src={logo} alt="logo fabrique entertainment" />
                    </a>
                        { visible === false && <FontAwesomeIcon onClick={ handlerMobilemenu } className={classes.bars} icon={solid('bars')}/> }
                        { visible && <div className={classes.navigation__modal}>
                                <ul className={classes.navigation__mobile__menu}>
                                    <li>
                                        <a href="/">home</a>
                                    </li>
                                    <li>
                                        <a href="/about">about</a>
                                    </li>
                                    <li>
                                        <a className={classes.navigation__films__mobile} href="/films">films</a>
                                        <ul className={classes.navigation__films__mobile__dropdown}>
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
                            </div>
                        } 
                </nav>
            </>
        )
}

export default NavigationMobile;