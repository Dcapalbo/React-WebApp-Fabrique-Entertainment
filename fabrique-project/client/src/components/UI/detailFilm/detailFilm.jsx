import { dataFilmActions } from "../../../store/data-film-slice";
import { useSelector, useDispatch } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import React from "react";

const DetailFilm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const film = useSelector((state) => state.dataFilm.filmData);
  const [isLoading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (film) {
      setFilmData(film);
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [film]);

  useEffect(() => {
    dispatch(dataFilmActions.resetFilmData());
  }, [dispatch]);

  return (
    <section className={classes.detail__film__about__container}>
      <img
        className={classes.detail__film__about__card__image}
        src={filmData[0]?.imageUrl ?? ""}
        alt={filmData[0]?.title ?? ""}
        title={filmData[0]?.title ?? ""}
        loading="lazy"
      />
      <div className={classes.detail__film__about__card__info}>
        {filmData[0]?.title && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("title")}:</h2>
            </div>
            <div>
              <h2>{filmData[0]?.title ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData[0]?.director && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("director")}:</h2>
            </div>
            <div>
              <h2>{filmData[0]?.director ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData[0]?.production && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("production")}:</h2>
            </div>
            <div>
              <h2>{filmData[0]?.production ?? ""}</h2>
            </div>
          </div>
        )}
        {filmData[0]?.screenwriter && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("screenwriter")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.screenwriter ?? ""}</p>
            </div>
          </div>
        )}
        {filmData[0]?.directorOfPhotography && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("directorOfPhotography")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.directorOfPhotography ?? ""}</p>
            </div>
          </div>
        )}
        {filmData[0]?.synopsis && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("synopsis")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.synopsis ?? ""}</p>
            </div>
          </div>
        )}
        {filmData[0]?.duration && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("duration")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.duration ?? ""}</p>
            </div>
          </div>
        )}
        {filmData[0]?.year && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("year")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.year ?? ""}</p>
            </div>
          </div>
        )}
        {filmData[0]?.type && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("typology")}:</p>
            </div>
            <div>
              <p>{filmData[0]?.type ?? ""}</p>
            </div>
          </div>
        )}
      </div>
      {isLoading
        ? isLoading && (
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
          )
        : error && (
            <div>
              <small>
                Il film selezionato non è stato trovato, tornare alla pagina
                precedente
              </small>
            </div>
          )}
    </section>
  );
};

export default DetailFilm;
