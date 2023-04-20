import { contactSchema } from "../../../schema/conctactSchema";
import { slugCreation } from "../../../utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

const AboutContactForm = () => {
  const { t } = useTranslation();
  const uriLocation = window.location.href;

  useEffect(() => {
    if (
      uriLocation !==
      `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/contacts/update-contact`
    ) {
      window.localStorage.removeItem("dataUpdateContact");
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  let dataUpdateContact;

  if (window.localStorage.getItem("dataUpdateContact")) {
    dataUpdateContact = JSON.parse(
      window.localStorage.getItem("dataUpdateContact")
    );
  }
  const { register, handleSubmit, formState } = useForm({
    defaultValues: dataUpdateContact ?? "",
    resolver: zodResolver(contactSchema),
  });

  const navigate = useNavigate();

  const { errors } = formState;

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const { name, surname, role, bio, email, phoneNumber } = event;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("role", role);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("phoneNumber", parseInt(phoneNumber));
    formData.append("slug", slugCreation(name));
    formData.append("file", file);

    if (dataUpdateContact !== undefined) {
      formData.append("_id", dataUpdateContact.payload?._id);
    }

    if (formData !== {}) {
      if (
        uriLocation ===
        `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/add-new-contact`
      ) {
        setIsLoading(true);
        axios
          .post(`${process.env.REACT_APP_API_LOCAL_PORT}/add-contact`, formData)
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
        uriLocation ===
        `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/contacts/update-contact`
      ) {
        setIsLoading(true);
        axios
          .put(
            `${process.env.REACT_APP_API_LOCAL_PORT}/update-contact`,
            formData
          )
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
    } else {
      console.log("problemi");
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
            ? !isUpdate && <h4>{t("labels.addDbContact")}</h4>
            : isUpdate && <h4>{t("labels.modifyDbContact")}</h4>}
          <label htmlFor="name">{t("genericInfo.name")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.name ?? ""}
            {...register("name")}
            type="text"
          />
          {errors.name?.message && <small>{errors.name?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Surname">{t("genericInfo.surname")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.surname ?? ""}
            {...register("surname")}
            type="text"
          />
          {errors.surname?.message && <small>{errors.surname?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Role">{t("role")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.role ?? ""}
            {...register("role")}
            type="text"
          />
          {errors.role?.message && <small>{errors.role?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Bio">{t("bio")}</label>
          <textarea
            defaultValue={formState.defaultValues?.payload?.bio ?? ""}
            {...register("bio")}
            type="text"
          ></textarea>
          {errors.bio?.message && <small>{errors.bio?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">{t("genericInfo.email")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.email ?? ""}
            {...register("email")}
            type="email"
          />
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="phoneNumber">{t("genericInfo.number")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.phoneNumber ?? ""}
            {...register("phoneNumber")}
            type="number"
          />
          {errors.phoneNumber?.message && (
            <small>{errors.phoneNumber?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">{t("profileConver")}</label>
          <input
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
            type="file"
            name="Image"
            required
          />
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
                    {t("insertAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
              )
            : isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
                    {t("modifyAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
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
