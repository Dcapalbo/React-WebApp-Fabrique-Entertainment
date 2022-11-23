import classes from './contactForm.module.scss';
import { useState, useRef } from 'react';
import axios from 'axios';
import React from 'react';

const FilmForm = () => {

    const genericLength = (value) => value.trim().length >= 3 && value.trim().length <= 30;
    const durationLength = (value) => value.trim().length >= 1 && value.trim().length <= 3; 
    const descriptionLength = (value) => value.trim().length >= 10 && value.trim().length <= 300; 
    const isEmpty = (value) => value.trim() === '';

    const [formInputsValidity, setFormInputsValidity] = useState({
        title: true,
        duration: true,
        director: true,
        description: true
    });
    
    const titleInputRef = useRef();
    const durationInputRef = useRef();
    const directorInputRef = useRef();
    const descriptionInputRef = useRef();

    const confirmHandler = async (event) => {

        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDuration = durationInputRef.current.value;
        const enteredDirector = directorInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
    
        const enteredTitleIsValid = !isEmpty(enteredTitle) && genericLength(enteredTitle);
        const enteredDurationIsValid = !isEmpty(enteredDuration) && durationLength(enteredDuration);
        const enteredDirectorIsValid = genericLength(enteredDirector) && !isEmpty(enteredDirector);
        const enteredDescriptionsValid = !isEmpty(enteredDescription) && descriptionLength(enteredDescription);
    
        setFormInputsValidity({
            title: enteredTitleIsValid,
            duration: enteredDurationIsValid,
            director: enteredDirectorIsValid,
            description: enteredDescriptionsValid
        })
    
        const formIsValid = 
            enteredTitleIsValid && 
            enteredDurationIsValid && 
            enteredDirectorIsValid && 
            enteredDescriptionsValid;
        
        if(formIsValid) {
            const formData =  {
                title: enteredTitle,
                duration: enteredDuration,
                director: enteredDirector,
                description: enteredDescription
            }

            const config = {
                headers: {
                    "Content-Type":"application/json"
                }
            }
            console.log("prima della chiamata");
            await axios
                .post("http://localhost:5000/add-film", formData, config)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((err) => console.error("there is an error: ", err.name));
            console.log("dopo la chiamata");
        }
    }

    return(
        <section className={classes.form__wrapper}>
            <form className={classes.form__container}>
                <h4>Aggiungi un film al database</h4>
                <div className={classes.form__container__item}>
                    <label htmlFor="Title">
                        Titolo
                    </label>
                    <input
                        ref={titleInputRef}
                        type="text" 
                        id="formTitle" 
                        name="Title" 
                        required
                        >    
                    </input>
                    {!formInputsValidity.title && <small>Campo obbligatorio, inserire il titolo del film</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Duration">
                        Durata
                    </label>
                    <input 
                        ref={durationInputRef}
                        type="number" 
                        id="formDuration" 
                        name="Duration" 
                        required
                        >
                    </input>
                    {!formInputsValidity.duration && <small>Campo obbligatorio, inserire la durata del film</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Director">
                        Regista
                    </label>
                    <input
                        ref={directorInputRef}
                        type="text" 
                        id="formDirector" 
                        name="Director"
                        required
                        >
                    </input>
                    {!formInputsValidity.director && <small>Campo obbligatorio, inserire il regista del film</small>}
                </div>
                <div className={classes.form__container__item}>
                    <label htmlFor="Description">
                        Descrizione
                    </label>
                    <input 
                        ref={descriptionInputRef}
                        type="text" 
                        id="formDescription" 
                        name="Description" 
                        required
                        >
                    </input>
                    {!formInputsValidity.description && <small>Campo obbligatorio, inserire la descrizione del film</small>}
                </div>
                {/* <div className={classes.form__container__item}>
                    <label htmlFor="Image">
                        Cover
                    </label>
                    <input 
                        type="text" 
                        id="formDescription" 
                        name="Description" 
                        required
                        >
                    </input>
                </div> */}
                <div className={classes.form__container__item}>
                    <button 
                        onClick={confirmHandler}
                        className={classes.secondary__button}
                        type="button" 
                        id="formButton" 
                        name="button" 
                        >
                    Inserisci</button>
                </div>
            </form>
        </section>
    );
}

export default FilmForm;