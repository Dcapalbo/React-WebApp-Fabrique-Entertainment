import { loginSchema } from "../../../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmHandler = (event) => {
    const { email, password } = event;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_LOCAL_PORT}/login`, formData)
      .then((res) => {
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        window.location.replace("/admin/films");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("there is an error for the login form: ", err);
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          <h4>{t("labels.loginLabel")}</h4>
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
          <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
          <input {...register("confirmPassword")} type="password" />
        </div>
        {errors.confirmPassword?.message && (
          <small>{errors.confirmPassword?.message}</small>
        )}
        <div className={classes.form__container__item}>
          <Link to="/forgot-password">{t("labels.forgotLabel")}</Link>
          <button className={classes.secondary__button} type="submit">
            {t("signInAction")}
          </button>
        </div>
        {error && <small>{t("errors.login")}</small>}
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

export default LoginForm;
