import StateGetHook from "../../../hooks/stateGetHook";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";

const DetailAboutContact = () => {
  const { t } = useTranslation();
  const { contacts, loading, error } = StateGetHook(
    (state) => state.dataContact.contactData
  );

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
    <h1>
      Il contatto selezionato non è stato trovato, tornare alla pagina
      precedente
    </h1>;
  } else {
    return (
      <section className={classes.detail__film__about__container}>
        <img
          className={classes.detail__film__about__card__image}
          src={contacts.imageUrl ?? ""}
          alt={contacts.name ?? ""}
          name={contacts.name ?? ""}
          loading="lazy"
        />
        <div className={classes.detail__film__about__card__info}>
          {contacts.name && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <h2>{t("genericInfo.name")}:</h2>
              </div>
              <div>
                <h2>{contacts.name + " " + contacts.surname ?? ""}</h2>
              </div>
            </div>
          )}
          {contacts.role && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <h2>{t("role")}:</h2>
              </div>
              <div>
                <h2>{contacts.role ?? ""}</h2>
              </div>
            </div>
          )}
          {contacts.bio && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("bio")}:</p>
              </div>
              <div>
                <p>{contacts.bio ?? ""}</p>
              </div>
            </div>
          )}
          {contacts.email && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("genericInfo.email")}:</p>
              </div>
              <div>
                <p>{contacts.email ?? ""}</p>
              </div>
            </div>
          )}
          {contacts.phoneNumber && (
            <div className={classes.detail__film__about__card__info__wrapper}>
              <div>
                <p>{t("genericInfo.number")}:</p>
              </div>
              <div>
                <p>{contacts.phoneNumber ?? ""}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default DetailAboutContact;
