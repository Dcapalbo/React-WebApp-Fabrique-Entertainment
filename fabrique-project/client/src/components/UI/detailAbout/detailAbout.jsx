import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilm.module.scss";
import { useState, useEffect } from "react";
import React from "react";

const DetailAboutContact = () => {
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
    <section className={classes.detail__film__container}>
      <img
        className={classes.detail__film__card__image}
        src={contactData.payload?.imageUrl ?? ""}
        alt={contactData.payload?.name ?? ""}
        name={contactData.payload?.name ?? ""}
        loading="lazy"
      />
      <div className={classes.detail__film__card__info}>
        {contactData.payload?.name && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <h2>Titolo:</h2>
            </div>
            <div>
              <h2>{contactData.payload?.name ?? ""}</h2>
            </div>
          </div>
        )}
        {contactData.payload?.surname && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <h2>Regista:</h2>
            </div>
            <div>
              <h2>{contactData.payload?.surname ?? ""}</h2>
            </div>
          </div>
        )}
        {contactData.payload?.role && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <h2>Produzione:</h2>
            </div>
            <div>
              <h2>{contactData.payload?.role ?? ""}</h2>
            </div>
          </div>
        )}
        {contactData.payload?.bio && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <p>Sceneggiatore:</p>
            </div>
            <div>
              <p>{contactData.payload?.bio ?? ""}</p>
            </div>
          </div>
        )}
        {contactData.payload?.email && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <p>Direttore della fotografia:</p>
            </div>
            <div>
              <p>{contactData.payload?.email ?? ""}</p>
            </div>
          </div>
        )}
        {contactData.payload?.phoneNumber && (
          <div className={classes.detail__film__card__info__wrapper}>
            <div>
              <p>Sinossi:</p>
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
