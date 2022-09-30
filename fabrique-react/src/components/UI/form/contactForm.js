import classes from './contactForm.module.scss';

// FORMIK adding the form TO DO 
const contactForm = (props) => {
    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <h4>Vuoi scoprirne di più? Mettiamoci in contatto</h4>
                <div className={classes.form__container__item}>
                    <label htmlFor="Nome">
                        Nome
                    </label>
                    <input type="text" id="formName" name="Nome" maxlenght="100" minlenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Cognome">
                        Cognome
                    </label>
                    <input type="text" id="formSurname" name="Cognome" maxlenght="100" minlenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Numero di telefono">
                        Numero di Telefono
                    </label>
                    <input type="text" id="formPhoneNumber" name="Numero di telefono" maxlenght="10" minlenght="10" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Email">
                        Email
                    </label>
                    <input type="email" id="formEmail" name="Email" maxlenght="100" minlenght="20" required></input>
                </div>
            </form>
        </section>
    );
}

export default contactForm;