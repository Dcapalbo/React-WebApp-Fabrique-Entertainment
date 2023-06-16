import { dataContactActions } from "../../../store/data-contact-slice";
import { useDispatch, useSelector } from "react-redux";
import classes from "../../../assets/card.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const AboutCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn, dispatch]);

  const sendContactFormHandler = () => {
    dispatch(
      dataContactActions.setContactData({
        name: props.name,
        surname: props.surname,
        role: props.role,
        bio: props.bio,
        email: props.email,
        slug: props.slug,
        phoneNumber: props.phoneNumber.toString(),
        imageUrl: props.imageUrl,
        _id: props._id,
      })
    );
    navigate("/admin/update-contact");
  };

  const sendContactIdHanlder = () => {
    dispatch(
      dataContactActions.setContactData({
        name: props.name,
        surname: props.surname,
        role: props.role,
        bio: props.bio,
        email: props.email,
        slug: props.slug,
        phoneNumber: props.phoneNumber.toString(),
        imageUrl: props.imageUrl,
        _id: props._id,
      })
    );
    navigate(`/about/${props.slug}`);
  };

  const deleteContactHandler = () => {
    setIsLoading(true);

    const contactId = {
      _id: props._id,
    };

    axios
      .delete(`${process.env.REACT_APP_API_LOCAL_PORT}/delete-contact`, {
        data: contactId,
      })
      .then((res) => {
        dispatch(dataContactActions.removeContactData({ _id: props._id }));
        window.location.replace("/admin/contacts");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(
          "there is an error for deleting the specific contact: ",
          err
        );
        setIsLoading(false);
        setError(err);
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
              onClick={sendContactFormHandler}
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
        {isLoading && <LoadingSpinner />}
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
