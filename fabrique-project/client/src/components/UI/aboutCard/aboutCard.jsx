import { dataContactActions } from "../../../store/data-contact-slice";
import classes from "../../../assets/card.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { isAuth } from "../../../utils/isAuth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react";

const AboutCard = (props) => {
  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
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
        window.location.replace("http://localhost:3000/admin/contacts");
      });
  };

  return (
    <>
      <div className={classes.card}>
        <img
          className={classes.card__image}
          src={props.imageUrl}
          alt={props.name}
          title={props.role}
          loading="lazy"
        />
        <div className={classes.card__description}>
          <h2 className={classes.card__name}>{props.name}</h2>
          <h3 className={classes.card__surname}>{props.surname}</h3>
          <p className={classes.card__role}>{props.role}</p>
          <p className={classes.card__bio}>{props.bio}</p>
          <small className={classes.card__email}>{props.email}</small>
          <input hidden id={props._id} />
          <small className={classes.card__phone__number}>
            {props.phonenumber}
          </small>
        </div>
        {isAuthenticated && (
          <div className={classes.card__button__wrapper}>
            <button
              onClick={deleteContactHandler}
              className={classes.card__cta}
            >
              Elimina Contatto
            </button>
            <a href="http://localhost:3000/admin/contacts/update-contact">
              <button
                onClick={sendContactDataHandler}
                className={classes.card__cta}
              >
                Modifica Contatto
              </button>
            </a>
          </div>
        )}
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
    </>
  );
};

export default AboutCard;
