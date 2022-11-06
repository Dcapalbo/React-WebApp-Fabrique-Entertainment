import classes from './contactForm.module.scss';
import { useState, useRef } from 'react';

const ContactForm = () => {

    const inputLength = (value) => value.trim().length >= 5 && value.trim().length <= 30; 
    const isTenCharaters = (value) => value.toString().length < 10;
    const isEmail = (value) => value.trim().includes('@');
    const isEmpty = (value) => value.trim() === '';

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        surname: true,
        number: true,
        email: true
    });
    
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const numberInputRef = useRef();
    const emailInputRef = useRef();

    const confirmHandler = (event) => {

        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredNumber = numberInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
    
        const enteredNameIsValid = !isEmpty(enteredName) && inputLength(enteredName);
        const enteredSurnameIsValid = !isEmpty(enteredSurname) && inputLength(enteredSurname);
        const enteredNumberIsValid = !isTenCharaters(enteredNumber) && !isEmpty(enteredNumber);
        const enteredEmailIsValid = !isEmpty(enteredEmail) && isEmail(enteredEmail) && inputLength(enteredEmail);
    
        setFormInputsValidity({
            name: enteredNameIsValid,
            surname: enteredSurnameIsValid,
            number: enteredNumberIsValid,
            email: enteredEmailIsValid
        })
    
        const formIsValid = 
            enteredNameIsValid && 
            enteredSurnameIsValid && 
            enteredNumberIsValid && 
            enteredEmailIsValid;
        
        if(formIsValid) {
            const formData =  {
                name: enteredName,
                surname: enteredSurname,
                number: enteredNumber,
                email: enteredEmail
            }
            console.log(formData);
        }
    }

    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <h4>Vuoi scoprirne di più? Mettiamoci in contatto</h4>
                <div className={classes.form__container__item}>
                    <label htmlFor="Nome">
                        Nome
                    </label>
                    <input
                        ref={nameInputRef}
                        type="text" 
                        id="formName" 
                        name="Nome" 
                        required
                        >    
                    </input>
                    {!formInputsValidity.name && <small>Campo obbligatorio, inserire un nome</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Cognome">
                        Cognome
                    </label>
                    <input 
                        ref={surnameInputRef}
                        type="text" 
                        id="formSurname" 
                        name="Cognome" 
                        required
                        >
                    </input>
                    {!formInputsValidity.surname && <small>Campo obbligatorio, inserire un cognome</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Numero di telefono">
                        Numero di Telefono
                    </label>
                    <input
                        ref={numberInputRef}
                        type="number" 
                        id="formPhoneNumber" 
                        name="Numero di telefono"
                        required
                        >
                    </input>
                    {!formInputsValidity.number && <small>Campo obbligatorio, inserire numero di telefono</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Email">
                        Email
                    </label>
                    <input 
                        ref={emailInputRef}
                        type="email" 
                        id="formEmail" 
                        name="Email" 
                        required
                        >
                    </input>
                    {!formInputsValidity.name && <small>Campo obbligatorio, inserire un email valida</small>}
                </div>
                <div className={classes.form__container__item}>
                    <button 
                        className={classes.secondary__button}
                        onClick={confirmHandler}
                        type="button" 
                        id="formButton" 
                        name="button" 
                        >
                    Invia</button>
                </div>
            </form>
        </section>
    );
}

export default ContactForm;