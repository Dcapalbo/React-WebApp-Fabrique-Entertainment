import { dataContactActions } from "../../../store/data-contact-slice";
import classes from "../../../assets/card.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { isAuth } from "../../../utils/isAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react";

const AboutCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuthenticated(isAuth("token"));
    dispatch(
      dataContactActions.addContactData({
        name: props.name,
        surname: props.surname,
        role: props.role,
        bio: props.bio,
        email: props.email,
        phoneNumber: props.phoneNumber,
        slug: props.slug,
        imageUrl: props.imageUrl,
        _id: props._id,
      })
    );
  }, [dispatch, props]);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
            slug: props.slug,
            phoneNumber: props.phoneNumber,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
    navigate("/admin/contacts/update-contact");
  };

  const sendContactIdHanlder = () => {
    window.localStorage.setItem(
      "contactData",
      JSON.stringify(
        dispatch(
          dataContactActions.addContactData({
            name: props.name,
            surname: props.surname,
            role: props.role,
            bio: props.bio,
            email: props.email,
            slug: props.slug,
            phoneNumber: props.phoneNumber,
            imageUrl: props.imageUrl,
            _id: props._id,
          })
        )
      )
    );
    navigate(`/about/${props.slug}`);
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
        window.location.replace("/admin/contacts");
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className={classes.card}>
        {props.imageUrl && (
          <img
            onClick={sendContactIdHanlder}
            className={classes.card__image}
            src={props.imageUrl}
            alt={props.name}
            title={props.role}
            loading="lazy"
          />
        )}
        <div className={classes.card__description}>
          {props.name && <h2>{props.name}</h2>}
          {props.surname && <h3>{props.surname}</h3>}
          {props.role && <p>{props.role}</p>}
          {props.bio && <p>{props.bio}</p>}
          {props.email && <small>{props.email}</small>}
          {props.slug && <input hidden id={props.slug} />}
          {props._id && <input hidden id={props._id} />}
          {props.phoneNumber && <small>{props.phonenumber}</small>}
        </div>
        {isAuthenticated && (
          <div className={classes.card__button__wrapper}>
            <button
              onClick={sendContactDataHandler}
              className={classes.card__cta}
            >
              Modifica Contatto
            </button>
            <button
              onClick={deleteContactHandler}
              className={classes.card__cta}
            >
              Elimina Contatto
            </button>
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
