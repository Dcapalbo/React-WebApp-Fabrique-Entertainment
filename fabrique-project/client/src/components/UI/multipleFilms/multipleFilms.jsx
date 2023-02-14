import classes from "./multipleFilms.module.scss";
import React from "react";

const MultipleFilms = (props) => {
  return (
    <div className={classes.film__card__container}>
      {props.imageUrl && (
        <img
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

export default MultipleFilms;
