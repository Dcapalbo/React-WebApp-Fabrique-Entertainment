import { useState, useRef, useEffect } from "react";
import classes from "./contactForm.module.scss";
import axios from "axios";
import React from "react";

const FilmForm = () => {
  useEffect(() => {
    let dataUpdateFilm = JSON.parse(
      window.localStorage.getItem("dataUpdateFilm")
    );
    if (dataUpdateFilm) {
      setDataFilm({
        title: dataUpdateFilm.payload.title,
        duration: dataUpdateFilm.payload.duration,
        director: dataUpdateFilm.payload.director,
        description: dataUpdateFilm.payload.description,
        year: dataUpdateFilm.payload.year,
        type: dataUpdateFilm.payload.type,
        imageUrl: dataUpdateFilm.payload.imageUrl,
        _id: dataUpdateFilm.payload._id,
      });
    }
  }, []);

  const [dataFilm, setDataFilm] = useState({
    title: "",
    duration: "",
    director: "",
    description: "",
    year: "",
    type: "",
    imageUrl: "",
    _id: "",
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    duration: true,
    director: true,
    description: true,
    year: true,
    type: true,
  });

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [file, setFile] = useState(null);

  const descriptionLength = (value) =>
    value.trim().length >= 10 && value.trim().length <= 300;
  const genericLength = (value) =>
    value.trim().length >= 3 && value.trim().length <= 30;
  const durationLength = (value) =>
    value.trim().length >= 1 && value.trim().length <= 3;
  const yearLength = (value) => value.trim().length === 4;
  const isEmpty = (value) => value.trim() === "";

  const titleInputRef = useRef();
  const durationInputRef = useRef();
  const directorInputRef = useRef();
  const descriptionInputRef = useRef();
  const yearInputRef = useRef();
  const typeInputRef = useRef();

  const uriLocation = window.location.href;

  useEffect(() => {
    if (uriLocation === "http://localhost:3000/films/addNewFilm") {
      setIsUpdate(false);
    } else if (uriLocation === "http://localhost:3000/films/update-film") {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDuration = durationInputRef.current.value;
    const enteredDirector = directorInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredType = typeInputRef.current.value;

    const enteredTitleIsValid =
      !isEmpty(enteredTitle) && genericLength(enteredTitle);
    const enteredDurationIsValid =
      !isEmpty(enteredDuration) && durationLength(enteredDuration);
    const enteredDirectorIsValid =
      genericLength(enteredDirector) && !isEmpty(enteredDirector);
    const enteredDescriptionsIsValid =
      !isEmpty(enteredDescription) && descriptionLength(enteredDescription);
    const enteredFileIsValid = file !== null && file !== "";
    const enteredYearIsValid = !isEmpty(enteredYear) && yearLength(enteredYear);
    const enteredTypeIsValid = !isEmpty(enteredType);

    setFormInputsValidity({
      title: enteredTitleIsValid,
      duration: enteredDurationIsValid,
      director: enteredDirectorIsValid,
      description: enteredDescriptionsIsValid,
      year: enteredYearIsValid,
      type: enteredTypeIsValid,
    });

    setEnteredFileisValid(enteredFileIsValid);

    const formIsValid =
      enteredTitleIsValid &&
      enteredDurationIsValid &&
      enteredDirectorIsValid &&
      enteredDescriptionsIsValid &&
      enteredYearIsValid &&
      enteredTypeIsValid;

    if (formIsValid) {
      const formData = new FormData();

      formData.append("title", enteredTitle);
      formData.append("duration", enteredDuration);
      formData.append("director", enteredDirector);
      formData.append("description", enteredDescription);
      formData.append("year", enteredYear);
      formData.append("type", enteredType);
      formData.append("file", file);

      if (dataFilm) {
        formData.append("_id", dataFilm._id);
      }

      if (uriLocation === "http://localhost:3000/films/addNewFilm") {
        axios
          .post("http://localhost:5000/add-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.error("there is an error: ", err.name));
      } else if (uriLocation === "http://localhost:3000/films/update-film") {
        axios
          .post("http://localhost:5000/update-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.error("there is an error: ", err.name));
      }
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form className={classes.form__container}>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && <h4>Aggiungere un film al Database</h4>
            : isUpdate && <h4>Modificare un film del Database</h4>}
          <label htmlFor="Title">Titolo</label>
          {dataFilm
            ? dataFilm && (
                <input
                  defaultValue={dataFilm.title}
                  ref={titleInputRef}
                  type="text"
                  name="Title"
                  required
                />
              )
            : !dataFilm && (
                <input ref={titleInputRef} type="text" name="Title" required />
              )}
          {!formInputsValidity.title && (
            <small>Campo obbligatorio, inserire il titolo del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Duration">Durata</label>
          {dataFilm
            ? dataFilm && (
                <input
                  defaultValue={dataFilm.duration}
                  ref={durationInputRef}
                  type="number"
                  name="Duration"
                  required
                />
              )
            : !dataFilm && (
                <input
                  ref={durationInputRef}
                  type="number"
                  name="Duration"
                  required
                />
              )}
          {!formInputsValidity.duration && (
            <small>Campo obbligatorio, inserire la durata del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Director">Regista</label>
          {dataFilm
            ? dataFilm && (
                <input
                  defaultValue={dataFilm.director}
                  ref={directorInputRef}
                  type="text"
                  name="Director"
                  required
                />
              )
            : !dataFilm && (
                <input
                  ref={directorInputRef}
                  type="text"
                  name="Director"
                  required
                />
              )}
          {!formInputsValidity.director && (
            <small>Campo obbligatorio, inserire il regista del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Description">Descrizione</label>
          {dataFilm
            ? dataFilm && (
                <textarea
                  defaultValue={dataFilm.description}
                  ref={descriptionInputRef}
                  type="text"
                  name="Description"
                  required
                ></textarea>
              )
            : !dataFilm && (
                <textarea
                  ref={descriptionInputRef}
                  type="text"
                  name="Description"
                  required
                ></textarea>
              )}
          {!formInputsValidity.description && (
            <small>Campo obbligatorio, inserire la descrizione del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Year">Anno</label>
          {dataFilm
            ? dataFilm && (
                <input
                  defaultValue={dataFilm.year}
                  ref={yearInputRef}
                  type="number"
                  name="Year"
                  required
                />
              )
            : !dataFilm && (
                <input ref={yearInputRef} type="number" name="Year" required />
              )}
          {!formInputsValidity.year && (
            <small>
              Campo obbligatorio, inserire l'anno di produzione del film
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Type">Tipologia</label>
          {dataFilm
            ? dataFilm && (
                <select ref={typeInputRef} defaultValue={dataFilm.type}>
                  <option>Lungometraggio</option>
                  <option>Cortometraggio</option>
                  <option>Documentario</option>
                </select>
              )
            : !dataFilm && (
                <select ref={typeInputRef} defaultValue="Cortometraggio">
                  <option>Lungometraggio</option>
                  <option>Cortometraggio</option>
                  <option>Documentario</option>
                </select>
              )}
          {!formInputsValidity.type && (
            <small>
              Campo obbligatorio, inserire una tipologia fra le scelte possibili
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">Cover</label>
          {dataFilm
            ? dataFilm && (
                <input
                  defaultValue={dataFilm.imageUrl}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                  type="file"
                  name="Image"
                  required
                />
              )
            : !dataFilm && (
                <input
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                  type="file"
                  name="Image"
                  required
                />
              )}
          {!enteredFileIsValid && (
            <small>Campo obbligatorio, inserire la cover del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && (
                <button
                  onClick={confirmHandler}
                  className={classes.secondary__button}
                  type="submit"
                >
                  Inserisci
                </button>
              )
            : isUpdate && (
                <button
                  onClick={confirmHandler}
                  className={classes.secondary__button}
                  type="submit"
                >
                  Modifica
                </button>
              )}
        </div>
      </form>
    </section>
  );
};

export default FilmForm;
