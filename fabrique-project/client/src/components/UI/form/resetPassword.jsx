import { resetPasswordSchema } from "../../schema/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(resetPasswordSchema),
  });

  const { errors } = formState;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmHandler = (event) => {
    const formData = new FormData();

    formData.append("password", event.password);

    setIsLoading(true);
    axios
      .put("http://localhost:5000/reset-password", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("there is an error for the login form: ", err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/");
      });
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          <h4>Inserisci la tua nuova password</h4>
          <label htmlFor="Password">Password</label>
          <input {...register("password")} type="password" />
        </div>
        {errors.password?.message && <small>{errors.password?.message}</small>}
        <div className={classes.form__container__item}>
          <label htmlFor="confirmPassword">Conferma Password</label>
          <input {...register("confirmPassword")} type="password" />
        </div>
        {errors.confirmPassword?.message && (
          <small>{errors.confirmPassword?.message}</small>
        )}
        <div className={classes.form__container__item}>
          <button className={classes.secondary__button} type="submit">
            Conferma
          </button>
        </div>
        {error && (
          <small>
            Problema durante il ripristino della password, provare a
            rieffettuare i passaggi
          </small>
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
      </form>
    </section>
  );
};

export default ForgotPassword;
