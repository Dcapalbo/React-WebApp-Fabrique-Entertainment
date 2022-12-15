import { dataContactActions } from "../../../store/data-contact-slice";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./aboutCard.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";

const AboutCard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const sendContactDataHandler = () => {
    window.localStorage.setItem(
      "dataUpdateContact",
      JSON.stringify(
        dispatch(
          dataContactActions.addContactData({
            name: props.name,
            surname: props.surname,
            role: props.role,
            bio: props.bio,
            email: props.email,
            phoneNumber: props.phoneNumber,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
  };

  const deleteContactHandler = () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("_id", props._id);

    axios
      .post("http://localhost:5000/delete-contact", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific contact: ",
          err.name
        );
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        window.location.replace("http://localhost:3000/contacts");
      });
  };

  return (
    <>
      <div className={classes.about__card}>
        <img
          className={classes.about__card__image}
          src={props.imageUrl}
          alt={props.name}
          title={props.role}
          loading="lazy"
        />
        <div className={classes.about__card__description}>
          <h2 className={classes.about__card__name}>{props.name}</h2>
          <h3 className={classes.about__card__surname}>{props.surname}</h3>
          <p className={classes.about__card__role}>{props.role}</p>
          <p className={classes.about__card__bio}>{props.bio}</p>
          <small className={classes.about__card__email}>{props.email}</small>
          <input hidden id={props._id} />
          <small className={classes.about__card__phone__number}>
            {props.phonenumber}
          </small>
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
        {error && (
          <small>
            Problema nell' eliminazione del singolo contatto, riprovare
          </small>
        )}
      </div>
      <div className={classes.about__card__button__wrapper}>
        <button
          onClick={deleteContactHandler}
          className={classes.about__card__cta}
        >
          Elimina Contatto
        </button>
        <a href="http://localhost:3000/contacts/update-contact">
          <button
            onClick={sendContactDataHandler}
            className={classes.about__card__cta}
          >
            Modifica Contatto
          </button>
        </a>
      </div>
    </>
  );
};

export default AboutCard;
