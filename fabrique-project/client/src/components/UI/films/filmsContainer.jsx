import classes from "./filmsContainer.module.scss";
import base64ArrayBuffer from "../../../utils/base64";
import { useSelector } from "react-redux";
import Films from "./films";
import { useState } from "react";
import { useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const FilmsContainer = () => {
  const film = useSelector((state) => state.dataFilm.filmData);
  const [loading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState({});
  const [error, setError] = useState(null);

  console.log(film);

  useEffect(() => {
    setIsLoading(true);
    if (film) {
      setFilmData(film);
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, [film]);

  if (loading) {
    return (
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
    );
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Non ci sono elementi per questa ricerca, inserirli manualmente presso la
        sezione del Database dedicata ai film
      </h1>
    );
  } else {
    return (
      filmData && (
        <section className={classes.wrapper__films__container}>
          {filmData.map((film) => (
            <Films
              title={film.title}
              director={film.director}
              production={film.production}
              screenwriter={film.screenwriter}
              directorOfPhotography={film.directorOfPhotography}
              synopsis={film.synopsis}
              duration={film.duration}
              year={film.year}
              slug={film.slug}
              type={film.type}
              imageUrl={`data:image/png;base64,${base64ArrayBuffer(film)}`}
              key={film._id}
              _id={film._id}
            />
          ))}
        </section>
      )
    );
  }
};

export default FilmsContainer;
