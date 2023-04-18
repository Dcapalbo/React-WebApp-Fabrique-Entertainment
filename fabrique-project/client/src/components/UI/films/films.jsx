import { dataFilmActions } from "../../../store/data-film-slice";
import classes from "./films.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";

const Films = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className={classes.film__card__container}>
      {props.imageUrl && (
        <img
          onClick={sendFilmIdHanlder}
          className={classes.film__card}
          src={props?.imageUrl ?? ""}
          alt={props?.title ?? ""}
          title={props?.title ?? ""}
          loading="lazy"
        />
      )}
      <div className={classes.film__card__description}>
        {props?.title && <h2>{props?.title ?? ""}</h2>}
        {props?.director && <h2>{props?.director ?? ""}</h2>}
        {props?.production && <h2>{props?.production ?? ""}</h2>}
        {props?.screenwriter && <p>{props?.screenwriter ?? ""}</p>}
        {props?.directorOfPhotography && (
          <p>{props?.directorOfPhotography ?? ""}</p>
        )}
        {props?.synopsis && <p>{props?.synopsis ?? ""}</p>}
        {props?.duration && <small>{props?.duration ?? ""}</small>}
        {props?.year && <small>{props?.year ?? ""}</small>}
        {props?.type && <small>{props?.type ?? ""}</small>}
        {props?._id && <input hidden id={props?._id ?? ""} />}
      </div>
    </div>
  );
};

export default Films;
