import PuffLoader from "react-spinners/PuffLoader";
import classes from "./cardContainer.module.scss";
import base64ArrayBuffer from "../../../utils/base64";
import ApiGetHook from "../../../hooks/apiGetHook";
import FilmCard from "./filmCard";

const FilmCardContainer = () => {
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
    <h1>There is some problem, please try to refresh</h1>;
  } else {
    return (
      <section className={classes.wrapper__card__container}>
        <div className={classes.card__container}>
          {fabriqueData.map((film) => (
            <FilmCard
              title={film.title}
              director={film.director}
              production={film.production}
              screenwriter={film.screenwriter}
              directorOfPhotography={film.directorOfPhotography}
              synopsis={film.synopsis}
              imageUrl={`data:image/png;base64,${base64ArrayBuffer(film)}`}
              duration={film.duration}
              year={film.year}
              slug={film.slug}
              type={film.type}
              key={film._id}
              _id={film._id}
            />
          ))}
        </div>
      </section>
    );
  }
};

export default FilmCardContainer;
