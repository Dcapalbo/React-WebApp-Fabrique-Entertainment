import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";

const DetailFilm = () => {
  const { t } = useTranslation();
  const film = useSelector((state) => state.dataFilm);
  const [loading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState({});
  const [error, setError] = useState(null);

  console.log(film);

  useEffect(() => {
    setIsLoading(true);
    if (film) {
      setFilmData(film);
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [film]);

  if (loading) {
    return (
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
    );
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Il film selezionato non è stato trovato, tornare alla pagina precedente
      </h1>
    );
  } else {
    return (
      <section className={classes.detail__film__about__container}>
        <img
          className={classes.detail__film__about__card__image}
          src={filmData?.imageUrl ?? ""}
          alt={filmData?.title ?? ""}
          title={filmData?.title ?? ""}
          loading="lazy"
        />
        <div className={classes.detail__film__about__card__info}>
          {filmData?.title && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <h2>{t("title")}:</h2>
              </div>
              <div>
                <h2>{filmData?.title ?? ""}</h2>
              </div>
            </div>
          )}
          {filmData?.director && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <h2>{t("director")}:</h2>
              </div>
              <div>
                <h2>{filmData?.director ?? ""}</h2>
              </div>
            </div>
          )}
          {filmData?.production && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <h2>{t("production")}:</h2>
              </div>
              <div>
                <h2>{filmData?.production ?? ""}</h2>
              </div>
            </div>
          )}
          {filmData?.screenwriter && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("screenwriter")}:</p>
              </div>
              <div>
                <p>{filmData?.screenwriter ?? ""}</p>
              </div>
            </div>
          )}
          {filmData?.directorOfPhotography && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("directorOfPhotography")}:</p>
              </div>
              <div>
                <p>{filmData?.directorOfPhotography ?? ""}</p>
              </div>
            </div>
          )}
          {filmData?.synopsis && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("synopsis")}:</p>
              </div>
              <div>
                <p>{filmData?.synopsis ?? ""}</p>
              </div>
            </div>
          )}
          {filmData?.duration && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("duration")}:</p>
              </div>
              <div>
                <p>{filmData?.duration ?? ""}</p>
              </div>
            </div>
          )}
          {filmData?.year && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("year")}:</p>
              </div>
              <div>
                <p>{filmData?.year ?? ""}</p>
              </div>
            </div>
          )}
          {filmData?.type && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("typology")}:</p>
              </div>
              <div>
                <p>{filmData?.type ?? ""}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default DetailFilm;
