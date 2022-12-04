import { useState, useRef, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import axios from "axios";
import React from "react";

const AboutContactForm = () => {
  useEffect(() => {
    let dataUpdateContact = JSON.parse(
      window.localStorage.getItem("dataUpdateContact")
    );
    if (dataUpdateContact) {
      setDataContact({
        name: dataUpdateContact.payload.name,
        surname: dataUpdateContact.payload.surname,
        role: dataUpdateContact.payload.role,
        bio: dataUpdateContact.payload.bio,
        email: dataUpdateContact.payload.email,
        phoneNumber: dataUpdateContact.payload.phoneNumber,
        imageUrl: dataUpdateContact.payload.imageUrl,
        _id: dataUpdateContact.payload._id,
      });
    }
  }, []);

  const [dataContact, setDataContact] = useState({
    name: "",
    surname: "",
    role: "",
    bio: "",
    email: "",
    phoneNumber: "",
    imageUrl: "",
    _id: "",
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    surname: true,
    role: true,
    bio: true,
    email: true,
    phoneNumber: true,
  });

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const genericLength = (value) =>
    value.trim().length >= 3 && value.trim().length <= 15;
  const roleLength = (value) =>
    value.trim().length >= 5 && value.trim().length <= 30;
  const surnameLength = (value) =>
    value.trim().length >= 3 && value.trim().length <= 20;
  const bioLength = (value) =>
    value.trim().length >= 10 && value.trim().length <= 300;
  const emailCheck = (value) =>
    value.trim().length > 10 &&
    value.trim().length < 40 &&
    value.trim().includes("@");
  const phonenumberlength = (value) => value.length === 10;
  const isEmpty = (value) => value.trim() === "";

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const roleInputRef = useRef();
  const bioInputRef = useRef();
  const emailInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const uriLocation = window.location.href;

  useEffect(() => {
    if (uriLocation !== "http://localhost:3000/contacts/update-contact") {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredRole = roleInputRef.current.value;
    const enteredBio = bioInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

    const enteredNameIsValid =
      !isEmpty(enteredName) && genericLength(enteredName);
    const enteredSurnameIsValid =
      !isEmpty(enteredSurname) && surnameLength(enteredSurname);
    const enteredRoleIsValid = roleLength(enteredRole) && !isEmpty(enteredRole);
    const enteredBioIsValid = !isEmpty(enteredBio) && bioLength(enteredBio);
    const enteredFileIsValid = file !== null && file !== "";
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && emailCheck(enteredEmail);
    const enteredPhoneNumberIsValid =
      !isEmpty(enteredPhoneNumber) && phonenumberlength(enteredPhoneNumber);

    setFormInputsValidity({
      name: enteredNameIsValid,
      surname: enteredSurnameIsValid,
      role: enteredRoleIsValid,
      bio: enteredBioIsValid,
      email: enteredEmailIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
    });

    setEnteredFileisValid(enteredFileIsValid);

    const formIsValid =
      enteredNameIsValid &&
      enteredSurnameIsValid &&
      enteredRoleIsValid &&
      enteredBioIsValid &&
      enteredEmailIsValid &&
      enteredPhoneNumberIsValid;

    if (formIsValid) {
      const formData = new FormData();

      formData.append("name", enteredName);
      formData.append("surname", enteredSurname);
      formData.append("role", enteredRole);
      formData.append("bio", enteredBio);
      formData.append("email", enteredEmail);
      formData.append("phoneNumber", enteredPhoneNumber);
      formData.append("file", file);

      //   if (dataContact) {
      //     formData.append("_id", dataContact._id);
      //   }

      if (uriLocation === "http://localhost:3000/contacts/add-new-contact") {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/add-contact", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(
              "there is an error for addition of a new Contact: ",
              err.name
            );
            setError(err);
          })
          .finally(() => {
            window.location.replace("http://localhost:3000/contacts");
            setIsLoading(false);
          });
      } else if (
        uriLocation === "http://localhost:3000/contacts/update-contact"
      ) {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/update-contact", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(
              "there is an error for updating a contact: ",
              err.name
            );
            setError(err);
          })
          .finally(() => {
            window.location.replace("http://localhost:3000/contacts");
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form className={classes.form__container}>
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
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && <h4>Aggiungere un Contatto al Database</h4>
            : isUpdate && <h4>Modificare un Contatto del Database</h4>}
          <label htmlFor="Title">Nome</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.name}
                  ref={nameInputRef}
                  type="text"
                  name="Name"
                  required
                />
              )
            : !dataContact && (
                <input ref={nameInputRef} type="text" name="Name" required />
              )}
          {!formInputsValidity.name && (
            <small>Campo obbligatorio, inserire il nome del contatto</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Surname">Cognome</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.surname}
                  ref={surnameInputRef}
                  type="text"
                  name="Surname"
                  required
                />
              )
            : !dataContact && (
                <input
                  ref={surnameInputRef}
                  type="text"
                  name="Surname"
                  required
                />
              )}
          {!formInputsValidity.surname && (
            <small>Campo obbligatorio, inserire il cognome del contatto</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Role">Ruolo</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.role}
                  ref={roleInputRef}
                  type="text"
                  name="Role"
                  required
                />
              )
            : !dataContact && (
                <input ref={roleInputRef} type="text" name="Role" required />
              )}
          {!formInputsValidity.role && (
            <small>Campo obbligatorio, inserire il ruolo del contatto</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Bio">Bio</label>
          {dataContact
            ? dataContact && (
                <textarea
                  defaultValue={dataContact.bio}
                  ref={bioInputRef}
                  type="text"
                  name="Bio"
                  required
                ></textarea>
              )
            : !dataContact && (
                <textarea
                  ref={bioInputRef}
                  type="text"
                  name="Bio"
                  required
                ></textarea>
              )}
          {!formInputsValidity.bio && (
            <small>
              Campo obbligatorio, inserire la biografia del contatto
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">Email</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.email}
                  ref={emailInputRef}
                  type="email"
                  name="Email"
                  required
                />
              )
            : !dataContact && (
                <input ref={emailInputRef} type="email" name="Email" required />
              )}
          {!formInputsValidity.email && (
            <small>Campo obbligatorio, inserire l'email del contatto</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="phonenumber">Numero di telefono</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.phoneNumber}
                  ref={phoneNumberInputRef}
                  type="number"
                  name="phonenumber"
                  required
                />
              )
            : !dataContact && (
                <input
                  ref={phoneNumberInputRef}
                  type="email"
                  name="phonenumber"
                  required
                />
              )}
          {!formInputsValidity.phoneNumber && (
            <small>
              Campo obbligatorio, inserire il numero di telefono del contatto
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">Foto del Profilo</label>
          {dataContact
            ? dataContact && (
                <input
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                  type="file"
                  name="Image"
                  required
                />
              )
            : !dataContact && (
                <input
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFile(file);
                  }}
                  type="file"
                  name="Image"
                  required
                />
              )}
          {!enteredFileIsValid && (
            <small>
              Campo obbligatorio, inserire la foto di profilo del contatto
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && (
                <>
                  <button
                    onClick={confirmHandler}
                    className={classes.secondary__button}
                    type="submit"
                  >
                    Inserisci
                  </button>
                </>
              )
            : isUpdate && (
                <>
                  <button
                    onClick={confirmHandler}
                    className={classes.secondary__button}
                    type="submit"
                  >
                    Modifica
                  </button>
                </>
              )}
        </div>
        {error && (
          <small>
            Problema nella compilazione del database, effettuare nuovamente la
            compilazione del form
          </small>
        )}
      </form>
    </section>
  );
};

export default AboutContactForm;
