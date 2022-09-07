import classes from './navModal.module.scss';

const NavModal = () => {

    const closingModalHandler = () => {
       let navigationModalMobile = document.querySelector(".navModal_navigation__modal__LjcJz");
       let body = document.querySelector("body");
       navigationModalMobile.style.display = "none";
       body.style.overflow = 'scroll';
    }

    return(
            <>
                <div className={classes.navigation__modal}>
                    <div className={classes.navigation__modal__close}>
                        <span onClick={closingModalHandler}>X</span>
                    </div>
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
            </>
    )
}

export default NavModal;