import { contactSchema } from "../../schema/conctactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

const AboutContactForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(contactSchema),
  });

  const navigate = useNavigate();

  const { errors, touchedFields } = formState;

  const uriLocation = window.location.href;

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

  const onChange = (e) => {
    console.log("touched Fields", touchedFields);
  };

  if (dataContact && touchedFields) {
    console.log(touchedFields);
  }

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
    if (uriLocation !== "http://localhost:3000/admin/contacts/update-contact") {
      window.localStorage.removeItem("dataUpdateContact");
      setIsUpdate(false);
      setDataContact({});
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();

    formData.append("name", event.name);
    formData.append("surname", event.surname);
    formData.append("role", event.role);
    formData.append("bio", event.bio);
    formData.append("email", event.email);
    formData.append("phoneNumber", parseInt(event.phoneNumber));
    formData.append("file", file);

    if (dataContact) {
      formData.append("_id", dataContact._id);
    }

    if (formData) {
      if (
        uriLocation === "http://localhost:3000/admin/contacts/add-new-contact"
      ) {
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
            navigate("/admin/contacts");
            setIsLoading(false);
          });
      } else if (
        uriLocation === "http://localhost:3000/admin/contacts/update-contact"
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
            navigate("/admin/contacts");
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && <h4>Aggiungere un Contatto al Database</h4>
            : isUpdate && <h4>Modificare un Contatto del Database</h4>}
          <label htmlFor="name">Nome</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.name}
                  {...register("name")}
                  type="text"
                />
              )
            : !dataContact && (
                <input onChange={onChange} {...register("name")} type="text" />
              )}
          {errors.name?.message && <small>{errors.name?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Surname">Cognome</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.surname}
                  {...register("surname")}
                  type="text"
                />
              )
            : !dataContact && <input {...register("name")} type="text" />}
          {errors.surname?.message && <small>{errors.surname?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Role">Ruolo</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.role}
                  {...register("role")}
                  type="text"
                />
              )
            : !dataContact && <input {...register("role")} type="text" />}
          {errors.role?.message && <small>{errors.role?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Bio">Bio</label>
          {dataContact
            ? dataContact && (
                <textarea
                  defaultValue={dataContact.bio}
                  {...register("bio")}
                  type="text"
                ></textarea>
              )
            : !dataContact && (
                <textarea {...register("bio")} type="text"></textarea>
              )}
          {errors.bio?.message && <small>{errors.bio?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">Email</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.email}
                  {...register("email")}
                  type="email"
                />
              )
            : !dataContact && <input {...register("email")} type="email" />}
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="phoneNumber">Numero di telefono</label>
          {dataContact
            ? dataContact && (
                <input
                  defaultValue={dataContact.phoneNumber}
                  {...register("phoneNumber")}
                  type="number"
                />
              )
            : !dataContact && (
                <input {...register("phoneNumber")} type="number" />
              )}
          {errors.phoneNumber?.message && (
            <small>{errors.phoneNumber?.message}</small>
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
                  <button className={classes.secondary__button} type="submit">
                    Inserisci
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && (
                      <small>
                        Problema nella compilazione del database, effettuare
                        nuovamente la compilazione del form
                      </small>
                    )}
                  </div>
                </>
              )
            : isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
                    Modifica
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && (
                      <small>
                        Problema nella compilazione del database, effettuare
                        nuovamente la compilazione del form
                      </small>
                    )}
                  </div>
                </>
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
      </form>
    </section>
  );
};

export default AboutContactForm;
