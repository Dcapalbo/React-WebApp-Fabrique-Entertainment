import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import React from "react";

const DetailAboutContact = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (window.localStorage.getItem("contactData")) {
      setContactData(JSON.parse(window.localStorage.getItem("contactData")));
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, []);

  return (
    <section className={classes.detail__film__about__container}>
      <img
        className={classes.detail__film__about__card__image}
        src={contactData.payload?.imageUrl ?? ""}
        alt={contactData.payload?.name ?? ""}
        name={contactData.payload?.name ?? ""}
        loading="lazy"
      />
      <div className={classes.detail__film__about__card__info}>
        {contactData.payload?.name && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("genericInfo.name")}:</h2>
            </div>
            <div>
              <h2>
                {contactData.payload?.name +
                  " " +
                  contactData.payload?.surname ?? ""}
              </h2>
            </div>
          </div>
        )}
        {contactData.payload?.role && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("role")}:</h2>
            </div>
            <div>
              <h2>{contactData.payload?.role ?? ""}</h2>
            </div>
          </div>
        )}
        {contactData.payload?.bio && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("bio")}:</p>
            </div>
            <div>
              <p>{contactData.payload?.bio ?? ""}</p>
            </div>
          </div>
        )}
        {contactData.payload?.email && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("genericInfo.email")}:</p>
            </div>
            <div>
              <p>{contactData.payload?.email ?? ""}</p>
            </div>
          </div>
        )}
        {contactData.payload?.phoneNumber && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("genericInfo.number")}:</p>
            </div>
            <div>
              <p>{contactData.payload?.phoneNumber ?? ""}</p>
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
            Il contatto selezionato non è stato trovato, tornare alla pagina
            precedente
          </small>
        )}
      </div>
    </section>
  );
};

export default DetailAboutContact;
