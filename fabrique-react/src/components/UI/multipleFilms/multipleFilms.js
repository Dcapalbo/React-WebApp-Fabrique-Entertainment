import { dataFilmActions } from "../../../store/data-film-slice";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./multipleFilms.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";

const MultipleFilms = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const deleteFilmHandler = () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("_id", props._id);

    axios
      .post("http://localhost:5000/delete-film", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific film: ",
          err.name
        );
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        window.location.replace("http://localhost:3000/films");
      });
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
        <input hidden id={props._id} />
        <div className={classes.film__card__button__wrapper}>
          <button
            onClick={deleteFilmHandler}
            className={classes.film__card__cta}
          >
            Elimina Film
          </button>
          <a href="http://localhost:3000/films/update-film">
            <button
              onClick={sendFilmDataHandler}
              className={classes.film__card__cta}
            >
              Modifica Film
            </button>
          </a>
        </div>
        {isLoading && (
          <PuffLoader
            style={{
              display: "inherit",
              position: "relative",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
            color={"#cc0000"}
            size={100}
          />
        )}
        {error && (
          <small>
            Problema nell' eliminazione del singolo film, riprovare la richiesta
          </small>
        )}
      </div>
    </div>
  );
};

export default MultipleFilms;
