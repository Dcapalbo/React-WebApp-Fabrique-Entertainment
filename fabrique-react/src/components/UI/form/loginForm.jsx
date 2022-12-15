import { useState, useRef } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import axios from "axios";
import React from "react";
// importing utils functions
import { genericLength, emailCheck, isEmpty } from "../../../utils/functions";

const LoginForm = () => {
  const [loginInputsValidity, setLoginInputsValidity] = useState({
    email: true,
    password: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && emailCheck(enteredEmail);
    const enteredPasswordIsValid =
      genericLength(enteredPassword) && !isEmpty(enteredPassword);

    setLoginInputsValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    if (formIsValid) {
      const formData = new FormData();

      formData.append("email", enteredEmail);
      formData.append("password", enteredPassword);

      console.log(formData);

      setIsLoading(true);
      axios
        .post("http://localhost:5000/login", formData)
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
          //   window.location.replace("http://localhost:3000/");
          setIsLoading(false);
        });
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form className={classes.form__container}>
        <div className={classes.form__container__item}>
          <h4>Esegui il login</h4>
          <label htmlFor="Email">Email</label>
          <input ref={emailInputRef} type="email" name="Email" required />
          {!loginInputsValidity.email && (
            <small>
              Campo obbligatorio, email errata, inserire un email di un account
              registrato
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Password">Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            name="Password"
            required
          />
          {!loginInputsValidity.password && (
            <small>
              Campo obbligatorio, password errata, inserire una passwrod di un
              account registrato
            </small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <button
            onClick={confirmHandler}
            className={classes.secondary__button}
            type="submit"
          >
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
