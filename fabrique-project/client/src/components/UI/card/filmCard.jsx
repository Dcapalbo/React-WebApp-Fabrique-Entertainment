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
        duration: props.duration,
        director: props.director,
        description: props.description,
        year: props.year,
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
    navigate("/admin/films/update-film");
  };

  const sendFilmIdHanlder = () => {
    window.localStorage.setItem(
      "filmData",
      JSON.stringify(
        dispatch(
          dataFilmActions.filmData({
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
    navigate(`/film/${props._id}`);
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
        navigate("/admin/films");
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
        {props.description && <p>{props.description}</p>}
        {props.type && <small>{props.type}</small>}
        {props.year && <p>{props.year}</p>}
        {props.duration && <p>{props.duration}</p>}
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
