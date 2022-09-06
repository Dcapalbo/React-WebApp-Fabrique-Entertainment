import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationMobile from '../nav/navMobile';
import classes from './header.module.scss';
import NavModal from '../modal/navModal';
import Navigation from '../nav/nav';
import { useState } from 'react';

const Header = () => {
    let domWidth = window.innerWidth;
    const [visible, setIsVisible] = useState(false);
    const handlerMobilemenu = () => {
        console.log(visible)
        setIsVisible(true);
    }
    return(
        <header className={classes.header}>
            <div className={classes.header__container}>
                {domWidth >= 767 && <Navigation />}
                {domWidth <= 767 && <NavigationMobile/>}
                {domWidth <= 767 && !visible && 
                    <FontAwesomeIcon 
                        onClick={ handlerMobilemenu } 
                        style={{color: "white", font: "20px", cursor: "pointer"}} 
                        icon={solid('bars')}
                    />
                }
                {visible && <NavModal />}     
            </div>
        </header>
    )
}

export default Header;