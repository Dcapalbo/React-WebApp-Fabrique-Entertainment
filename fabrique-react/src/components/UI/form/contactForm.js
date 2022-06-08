import React from 'react';
import { useState } from 'react';
import classes from './contactForm.module.scss';

const contactForm = (props) => {
    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <h4>Vuoi scoprirne di più? Mettiamoci in contatto</h4>
                <div className={classes.form__container__item}>
                    <label for="Nome">
                        Nome
                    </label>
                    <input type="text" id="formName" value="Nome" maxlenght="100" minlenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label for="Cognome">
                        Cognome
                    </label>
                    <input type="text" id="formSurname" value="Cognome" maxlenght="100" minlenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label for="Numero di telefono">
                        Numero di Telefono
                    </label>
                    <input type="text" id="formPhoneNumber" value="Numero di telefono" maxlenght="10" minlenght="10" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label for="Email">
                        Email
                    </label>
                    <input type="email" id="formEmail" value="Email" maxlenght="100" minlenght="20" required></input>
                </div>
            </form>
        </section>
    );
}

export default contactForm;