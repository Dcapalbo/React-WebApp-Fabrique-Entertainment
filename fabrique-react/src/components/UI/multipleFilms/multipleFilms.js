import React from "react";
import { useDispatch } from "react-redux";
import { dataFilmActions } from "../../../store/data-film-slice";
import classes from "./multipleFilms.module.scss";

const MultipleFilms = (props) => {
  const dispatch = useDispatch();

  const sendFilmDataHandler = () => {
    window.localStorage.setItem(
      "dataUpdateFilm",
      JSON.stringify(
        dispatch(
          dataFilmActions.addFilmData({
            title: props.title,
            duration: props.duration,
            director: props.director,
            description: props.description,
            year: props.year,
            type: props.type,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
  };

  return (
    <div className={classes.film__card__container}>
      {props.imageUrl && (
        <img
          className={classes.film__card}
          src={props.imageUrl}
          alt={props.title}
          title={props.title}
          loading="lazy"
        />
      )}
      <div className={classes.film__card__description}>
        <h2>{props.title}</h2>
        <h3>{props.director}</h3>
        <p>{props.description}</p>
        <small>{props.type}</small>
        <small>{props.duration}</small>
        <small>{props.year}</small>
        <input hidden id={props._id}></input>
        <div className={classes.film__card__button__wrapper}>
          <button className={classes.film__card__cta}>Elimina Film</button>
          <a href="http://localhost:3000/films/update-film">
            <button
              onClick={sendFilmDataHandler}
              className={classes.film__card__cta}
            >
              Modifica Film
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MultipleFilms;
