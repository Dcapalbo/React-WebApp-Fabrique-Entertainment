import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilmAbout.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";

const DetailAboutContact = () => {
  const { t } = useTranslation();
  const contact = useSelector((state) => state.dataContact.contactData);
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (contact) {
      setContactData(contact);
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [contact]);

  return (
    <section className={classes.detail__film__about__container}>
      <img
        className={classes.detail__film__about__card__image}
        src={contactData[0]?.imageUrl ?? ""}
        alt={contactData[0]?.name ?? ""}
        name={contactData[0]?.name ?? ""}
        loading="lazy"
      />
      <div className={classes.detail__film__about__card__info}>
        {contactData[0]?.name && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("genericInfo.name")}:</h2>
            </div>
            <div>
              <h2>
                {contactData[0]?.name + " " + contactData[0]?.surname ?? ""}
              </h2>
            </div>
          </div>
        )}
        {contactData[0]?.role && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <h2>{t("role")}:</h2>
            </div>
            <div>
              <h2>{contactData[0]?.role ?? ""}</h2>
            </div>
          </div>
        )}
        {contactData[0]?.bio && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("bio")}:</p>
            </div>
            <div>
              <p>{contactData[0]?.bio ?? ""}</p>
            </div>
          </div>
        )}
        {contactData[0]?.email && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("genericInfo.email")}:</p>
            </div>
            <div>
              <p>{contactData[0]?.email ?? ""}</p>
            </div>
          </div>
        )}
        {contactData[0]?.phoneNumber && (
          <div className={classes.detail__film__about__card__info__wrapper}>
            <div>
              <p>{t("genericInfo.number")}:</p>
            </div>
            <div>
              <p>{contactData[0]?.phoneNumber ?? ""}</p>
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
                Il contatto selezionato non è stato trovato, tornare alla pagina
                precedente
              </small>
            </div>
          )}
    </section>
  );
};

export default DetailAboutContact;
