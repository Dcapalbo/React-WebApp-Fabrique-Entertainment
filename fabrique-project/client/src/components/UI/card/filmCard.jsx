import { dataFilmActions } from "../../../store/data-film-slice";
import classes from "../../../assets/card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const FilmCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      dataFilmActions.setFilmData([
        {
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
        },
      ])
    );
  }, [dispatch, props]);

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const sendFilmDataHandler = () => {
    window.localStorage.setItem(
      "dataUpdateFilm",
      JSON.stringify(
        dispatch(
          dataFilmActions.setFilmData({
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
    navigate("/admin/update-film");
  };

  const sendFilmIdHanlder = () => {
    window.localStorage.setItem(
      "filmData",
      JSON.stringify(
        dispatch(
          dataFilmActions.setFilmData({
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

    const filmId = {
      _id: props._id,
    };

    axios
      .delete(`${process.env.REACT_APP_API_LOCAL_PORT}/delete-film`, {
        data: filmId,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/films");
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific film: ",
          err.name
        );
        setIsLoading(false);
        setError(err);
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
