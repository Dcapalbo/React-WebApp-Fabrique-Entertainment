import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useState, useEffect } from "react";
import React from "react";

const DetailFilm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (window.localStorage.getItem("filmData")) {
      setFilmData(JSON.parse(window.localStorage.getItem("filmData")));
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, []);

  return (
    <section className={classes.detail__film__about__container}>
      <img
        className={classes.detail__film__about__card__image}
        src={filmData.payload?.imageUrl ?? ""}
        alt={filmData.payload?.title ?? ""}
        title={filmData.payload?.title ?? ""}
        loading="lazy"
      />
      <div className={classes.detail__film__about__card__info}>
        {filmData.payload?.title && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>Titolo:</h2>
            </div>
            <div>
              <h2>{filmData.payload?.title ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData.payload?.director && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>Regista:</h2>
            </div>
            <div>
              <h2>{filmData.payload?.director ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData.payload?.production && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>Produzione:</h2>
            </div>
            <div>
              <h2>{filmData.payload?.production ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData.payload?.screenwriter && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Sceneggiatore:</p>
            </div>
            <div>
              <p>{filmData.payload?.screenwriter ?? ""}</p>
            </div>
          </div>
        )}
        {filmData.payload?.directorOfPhotography && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Direttore della fotografia:</p>
            </div>
            <div>
              <p>{filmData.payload?.directorOfPhotography ?? ""}</p>
            </div>
          </div>
        )}
        {filmData.payload?.synopsis && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Sinossi:</p>
            </div>
            <div>
              <p>{filmData.payload?.synopsis ?? ""}</p>
            </div>
          </div>
        )}
        {filmData.payload?.duration && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Durata:</p>
            </div>
            <div>
              <p>{filmData.payload?.duration ?? ""}</p>
            </div>
          </div>
        )}
        {filmData.payload?.year && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Anno:</p>
            </div>
            <div>
              <p>{filmData.payload?.year ?? ""}</p>
            </div>
          </div>
        )}
        {filmData.payload?.type && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>Tipologia:</p>
            </div>
            <div>
              <p>{filmData.payload?.type ?? ""}</p>
            </div>
          </div>
        )}
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
      <div>
        {error && (
          <small>
            Il film selezionato non è stato trovato, tornare alla pagina
            precedente
          </small>
        )}
      </div>
    </section>
  );
};

export default DetailFilm;
