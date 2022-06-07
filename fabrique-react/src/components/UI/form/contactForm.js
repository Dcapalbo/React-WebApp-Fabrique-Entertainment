import React from 'react';
import { useState } from 'react';
import classes from './contactForm.module.scss';

const contactForm = (props) => {
    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <div className={classes.form__container__item}>
                    <label>
                        Nome
                    </label>
                    <input type="text" maxLenght="100" minLenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label>
                        Cognome
                    </label>
                    <input type="text" maxLenght="100" minLenght="5" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label>
                        Numero di Telefono
                    </label>
                    <input type="text" maxLenght="10" minLenght="10" required></input>
                </div>
                <div className={classes.form__container__item}>
                    <label>
                        Email
                    </label>
                    <input type="email" maxLenght="100" minLenght="20" required></input>
                </div>
            </form>
        </section>
    );
}

export default contactForm;