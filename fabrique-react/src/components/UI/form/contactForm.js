import classes from './contactForm.module.scss';
import { useState } from 'react';


const ContactForm = () => {

    const [formData, setFormData] = useState([]);
    const [surname, setSurname] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const onChangeHandlerSurname = (event) => {
        setSurname(event.target.value);
    }

    const onChangeHandlerNumber = (event) => {
        setNumber(event.target.value);
        if (number === 2) {
            console.log("dio cane");
        }
    }

    const onChangeHandlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangeHandlerName = (event) => {
        setName(event.target.value);
    }

    const onClickHandler = () => {
        setFormData([surname, number, email, name]);
    } 

    console.log(formData);

    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <h4>Vuoi scoprirne di più? Mettiamoci in contatto</h4>
                <div className={classes.form__container__item}>
                    <label htmlFor="Nome">
                        Nome
                    </label>
                    <input
                        onChange={onChangeHandlerName}
                        type="text" 
                        id="formName" 
                        name="Nome" 
                        required
                        >    
                    </input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Cognome">
                        Cognome
                    </label>
                    <input 
                        onChange={onChangeHandlerSurname}
                        type="text" 
                        id="formSurname" 
                        name="Cognome" 
                        required
                        >
                    </input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Numero di telefono">
                        Numero di Telefono
                    </label>
                    <input
                        onChange={onChangeHandlerNumber}
                        type="number" 
                        id="formPhoneNumber" 
                        name="Numero di telefono"
                        required
                        >
                    </input>
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Email">
                        Email
                    </label>
                    <input 
                        onChange={onChangeHandlerEmail}
                        type="email" 
                        id="formEmail" 
                        name="Email" 
                        required
                        >
                    </input>
                </div>
                <div className={classes.form__container__item}>
                    <button
                        onClick={onClickHandler} 
                        type="button" 
                        id="formButton" 
                        name="button" 
                        >
                     Submit</button>
                </div>
            </form>
        </section>
    );
}

export default ContactForm;