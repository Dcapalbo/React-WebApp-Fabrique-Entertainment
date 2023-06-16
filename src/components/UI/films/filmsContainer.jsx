import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import StateGetHook from "../../../hooks/stateGetHook";
import base64ArrayBuffer from "../../../utils/base64";
import classes from "./filmsContainer.module.scss";
import Films from "./films";

const FilmsContainer = () => {
  const { films, loading, error } = StateGetHook(
    (state) => state.dataFilm.filmsData
  );

  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <h1 className={classes.text__align__center}>
        Non ci sono elementi per questa ricerca, inserirli manualmente presso la
        sezione del Database dedicata ai film
      </h1>
    );
  } else {
    return (
      films && (
        <section className={classes.wrapper__films__container}>
          {films.map((film) => (
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
