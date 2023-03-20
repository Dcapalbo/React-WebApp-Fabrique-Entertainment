import { signUpSchema } from "../../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
// importing utils functions

const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(signUpSchema),
  });

  const { errors } = formState;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const confirmHandler = (event) => {
    const formData = new FormData();

    formData.append("name", event.name);
    formData.append("email", event.email);
    formData.append("password", event.password);

    console.log(event.name);
    console.log(event.email);
    console.log(event.password);

    setIsLoading(true);
    axios
      .post("http://localhost:5000/sign-up", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(
          "there is an error for the creation of the user account: ",
          err
        );
        setError(err);
      })
      .finally(() => {
        navigate("/login");
        setIsLoading(false);
      });
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          <h4>{t("labels.signUpLabel")}</h4>
          <label htmlFor="Name">{t("genericInfo.name")}</label>
          <input {...register("name")} type="text" />
          {errors.name?.message && <small>{errors.name?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">{t("genericInfo.email")}</label>
          <input {...register("email")} type="email" />
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Password">{t("password")}</label>
          <input {...register("password")} type="password" />
        </div>
        {errors.password?.message && <small>{errors.password?.message}</small>}
        <div className={classes.form__container__item}>
          <button className={classes.secondary__button} type="submit">
            {t("createAccount")}
          </button>
        </div>
        {error && <small>{t("errors.signUp")}</small>}
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

export default SignUpForm;
