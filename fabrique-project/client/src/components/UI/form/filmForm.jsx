import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filmSchema } from "../../schema/filmSchema";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import classes from "./genericForm.module.scss";
import TypeSelect from "../select/typeSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const FilmForm = () => {
  const uriLocation = window.location.href;

  useEffect(() => {
    if (uriLocation !== "http://localhost:3000/admin/films/update-film") {
      window.localStorage.removeItem("dataUpdateFilm");
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  let dataUpdateFilm;

  if (window.localStorage.getItem("dataUpdateFilm")) {
    dataUpdateFilm = JSON.parse(window.localStorage.getItem("dataUpdateFilm"));
  }

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: dataUpdateFilm,
    resolver: zodResolver(filmSchema),
  });

  const navigate = useNavigate();

  const { errors } = formState;

  const { field } = useController({ name: "type", control });

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleSelectChange = (option) => {
    field.onChange(option.target.value);
  };

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();

    formData.append("title", event.title);
    formData.append("duration", parseInt(event.duration));
    formData.append("director", event.director);
    formData.append("description", event.description);
    formData.append("year", parseInt(event.year));
    formData.append("type", event.type);
    formData.append("file", file);

    if (dataUpdateFilm !== "") {
      formData.append("_id", dataUpdateFilm.payload._id);
    }

    if (formData !== {}) {
      if (uriLocation === "http://localhost:3000/admin/films/add-new-film") {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/add-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(
              "there is an error for addition of a new Film: ",
              err.name
            );
            setError(err);
          })
          .finally(() => {
            navigate("/admin/films");
            setIsLoading(false);
          });
      } else if (
        uriLocation === "http://localhost:3000/admin/films/update-film"
      ) {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/update-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("there is an error for updating a film: ", err.name);
            setError(err);
          })
          .finally(() => {
            navigate("/admin/films");
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
            ? !isUpdate && <h4>Aggiungere un film al Database</h4>
            : isUpdate && <h4>Modificare un film del Database</h4>}
          <label htmlFor="Title">Titolo</label>
          <input
            defaultValue={formState.defaultValues?.payload?.title ?? ""}
            {...register("title")}
            type="text"
          />
          {errors.title?.message && <small>{errors.title?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Duration">Durata</label>
          <input
            defaultValue={formState.defaultValues?.payload?.duration ?? ""}
            {...register("duration")}
            type="number"
          />
          {errors.duration?.message && (
            <small>{errors.duration?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Director">Regista</label>
          <input
            defaultValue={formState.defaultValues?.payload?.director ?? ""}
            {...register("director")}
            type="text"
          />
          {errors.director?.message && (
            <small>{errors.director?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Description">Descrizione</label>
          <textarea
            defaultValue={formState.defaultValues?.payload?.description ?? ""}
            {...register("description")}
            type="text"
          ></textarea>
          {errors.description?.message && (
            <small>{errors.description?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Year">Anno</label>
          <input
            defaultValue={formState.defaultValues?.payload?.year ?? ""}
            {...register("year")}
            type="number"
          />
          {errors.year?.message && <small>{errors.year?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Type">Tipologia</label>
          <TypeSelect onChange={handleSelectChange} value={field.value} />
          {errors.type?.message && <small>{errors.type?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">Cover</label>
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
            <small>Campo obbligatorio, inserire la cover del film</small>
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

export default FilmForm;
