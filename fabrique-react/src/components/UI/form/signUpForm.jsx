import { useState, useRef } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import axios from "axios";
import React from "react";
// importing utils functions
import { genericLength, emailCheck, isEmpty } from "../../../utils/functions";

const SignUpForm = () => {
  const [signUpInputsValidity, setSignUpIputsValidity] = useState({
    name: true,
    email: true,
    password: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredNameIsValid =
      !isEmpty(enteredName) && genericLength(enteredName);
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && emailCheck(enteredEmail);
    const enteredPasswordIsValid =
      genericLength(enteredPassword) && !isEmpty(enteredPassword);

    setSignUpIputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid =
      enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;

    if (formIsValid) {
      const formData = new FormData();

      formData.append("name", enteredName);
      formData.append("email", enteredEmail);
      formData.append("password", enteredPassword);

      console.log(formData);

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
          window.location.replace("http://localhost:3000/");
          setIsLoading(false);
        });
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form className={classes.form__container}>
        <div className={classes.form__container__item}>
          <h4>Crea il tuo account</h4>
          <label htmlFor="Name">Nome</label>
          <input ref={nameInputRef} type="text" name="Name" required />
          {!signUpInputsValidity.name && (
            <small>Campo obbligatorio, inserire un nome valido</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Email">Email</label>
          <input ref={emailInputRef} type="email" name="Email" required />
          {!signUpInputsValidity.email && (
            <small>Campo obbligatorio, inserire un email valida</small>
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
          {!signUpInputsValidity.password && (
            <small>Campo obbligatorio, inserire una password valida</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <button
            onClick={confirmHandler}
            className={classes.secondary__button}
            type="submit"
          >
            Crea Account
          </button>
        </div>
        {error && (
          <small>
            Problema nella creazione dell'utente, effettuare nuovamente la
            compilazione del form.
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

export default SignUpForm;
