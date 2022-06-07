import classes from './footer.module.scss';

const Footer = () => {
    return(
        <footer className={classes.footer}>
            <div className={classes.footer__container}>
                <h2 className={classes.footer__container__elm}>
                    testing
                </h2>
                <h2 className={classes.footer__container__elm}>
                    testing
                </h2>
            </div>
        </footer>
    )
}

export default Footer;