import { dataContactActions } from "../../../store/data-contact-slice";
import { contactSchema } from "../../../schema/conctactSchema";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import { slugCreation } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

const AboutContactForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uriLocation = window.location.href;

  let dataUpdateContact = useSelector((state) => {
    if (state.dataContact.contactData) {
      return state.dataContact.contactData;
    } else {
      return null;
    }
  });

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: dataUpdateContact ?? "",
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (
      uriLocation !==
      `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/update-contact`
    ) {
      reset();
      dispatch(dataContactActions.resetContactData());
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation, dispatch, reset]);

  const { errors } = formState;

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();

    const { name, surname, role, bio, email, phoneNumber } = event;

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("role", role);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("phoneNumber", parseInt(phoneNumber));
    formData.append("slug", slugCreation(name));
    formData.append("file", file);

    if (dataUpdateContact?._id) {
      formData.append("_id", dataUpdateContact?._id);
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
            setIsLoading(false);
            navigate("/admin/contacts");
          });
      } else if (
        uriLocation ===
        `${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/update-contact`
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
            console.error("there is an error for updating a contact: ", err);
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
            navigate("/admin/contacts");
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
          <label htmlFor="Image">{t("profileCover")}</label>
          <input
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
            type="file"
            name="Image"
            required
          />
          <input
            hidden
            defaultValue={formState.defaultValues?.payload?._id ?? ""}
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
        {isLoading && <LoadingSpinner />}
      </form>
    </section>
  );
};

export default AboutContactForm;
