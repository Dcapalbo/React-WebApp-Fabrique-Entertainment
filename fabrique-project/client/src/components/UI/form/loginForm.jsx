import { loginSchema } from "../../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import React from "react";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: "",
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmHandler = (event) => {
    const formData = new FormData();

    formData.append("email", event.email);
    formData.append("password", event.password);

    setIsLoading(true);
    axios
      .post("http://localhost:5000/login", formData)
      .then((res) => {
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        console.log(res.data.token);
      })
      .catch((err) => {
        console.error("there is an error for the login form: ", err);
        setError(err);
      })
      .finally(() => {
        window.location.replace("/admin/films");
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
          <h4>Esegui il login</h4>
          <label htmlFor="Email">Email</label>
          <input {...register("email")} type="email" />
          {errors.email?.message && <small>{errors.email?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
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
            Accedi
          </button>
        </div>
        {error && (
          <small>
            Problema durante l'accesso, compilare nuovamente il form, i dati
            potrebbero essere sbagliati.
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

export default LoginForm;
