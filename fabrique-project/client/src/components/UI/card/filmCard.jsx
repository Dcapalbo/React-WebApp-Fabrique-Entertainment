import { dataFilmActions } from "../../../store/data-film-slice";
import classes from "../../../assets/card.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { isAuth } from "../../../utils/isAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react";

const FilmCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
    dispatch(
      dataFilmActions.filmData({
        title: props.title,
        director: props.director,
        production: props.production,
        screenwriter: props.screenwriter,
        directorOfPhotography: props.directorOfPhotography,
        synopsis: props.synopsis,
        duration: props.duration,
        year: props.year,
        slug: props.slug,
        type: props.type,
        imageUrl: props.imageUrl,
        _id: props._id,
      })
    );
  }, [dispatch, props]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const sendFilmDataHandler = () => {
    window.localStorage.setItem(
      "dataUpdateFilm",
      JSON.stringify(
        dispatch(
          dataFilmActions.filmData({
            title: props.title,
            director: props.director,
            production: props.production,
            screenwriter: props.screenwriter,
            directorOfPhotography: props.directorOfPhotography,
            synopsis: props.synopsis,
            duration: props.duration,
            year: props.year,
            type: props.type,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
    navigate("/admin/films/update-film");
  };

  const sendFilmIdHanlder = () => {
    window.localStorage.setItem(
      "filmData",
      JSON.stringify(
        dispatch(
          dataFilmActions.filmData({
            title: props.title,
            director: props.director,
            production: props.production,
            screenwriter: props.screenwriter,
            directorOfPhotography: props.directorOfPhotography,
            synopsis: props.synopsis,
            duration: props.duration,
            year: props.year,
            slug: props.slug,
            type: props.type,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
    navigate(`/film/${props.slug}`);
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
        window.location.replace("/admin/films");
      });
  };

  return (
    <div className={classes.card}>
      {props.imageUrl && (
        <img
          onClick={sendFilmIdHanlder}
          className={classes.card__image}
          src={props.imageUrl}
          alt={props.title}
          title={props.title}
          loading="lazy"
        />
      )}
      <div className={classes.card__description}>
        {props.title && <h2>{props.title}</h2>}
        {props.director && <h3>{props.director}</h3>}
        {props.production && <p>{props.production}</p>}
        {props.screenwriter && <input hidden id={props.screenwriter} />}
        {props.directorOfPhotography && (
          <input hidden id={props.directorOfPhotography} />
        )}
        {props.synopsis && <p>{props.synopsis}</p>}
        {props.duration && <p>{props.duration}</p>}
        {props.year && <p>{props.year}</p>}
        {props.slug && <input hidden id={props.slug} />}
        {props.type && <small>{props.type}</small>}
        {props._id && <input hidden id={props._id} />}
      </div>
      {isAuthenticated && (
        <div className={classes.card__button__wrapper}>
          <button onClick={sendFilmDataHandler} className={classes.card__cta}>
            Modifica Film
          </button>
          <button onClick={deleteFilmHandler} className={classes.card__cta}>
            Elimina Film
          </button>
        </div>
      )}
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
        <small>Problema nell' eliminazione del singolo film, riprovare</small>
      )}
    </div>
  );
};

export default FilmCard;
