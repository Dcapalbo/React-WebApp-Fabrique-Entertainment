import classes from "./filmsContainer.module.scss";
import base64ArrayBuffer from "../../../utils/base64";
import PuffLoader from "react-spinners/PuffLoader";
import ApiGetHook from "../../../hooks/apiGetHook";
import Films from "./films";

const FilmsContainer = () => {
  const { fabriqueData, loading, error } = ApiGetHook(
    "http://localhost:5000/get-films"
  );

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
        There are some problem, please try to refresh
      </h1>
    );
  } else {
    return (
      <section className={classes.wrapper__films__container}>
        {fabriqueData.length > 0 ? (
          fabriqueData.map((film) => (
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
          ))
        ) : (
          <h1>
            Non ci sono elementi per questa ricerca, inserirli manualmente
            presso la sezione del Database dedicata ai film
          </h1>
        )}
      </section>
    );
  }
};

export default FilmsContainer;
