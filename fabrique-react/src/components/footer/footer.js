import classes from './footer.module.scss';

const Footer = () => {
    return(
        <footer className={classes.footer}>
            <div className={classes.footer__container}>
                <div className={classes.footer__container__elm}>
                    testing
                </div>
                <div className={classes.footer__container__elm}>
                    testing
                </div>
            </div>
        </footer>
    )
}

export default Footer;