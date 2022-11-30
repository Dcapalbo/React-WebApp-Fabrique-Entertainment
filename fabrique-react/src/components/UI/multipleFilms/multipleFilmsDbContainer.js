import classes from "./multipleFilmsContainer.module.scss";
import base64ArrayBuffer from "../../../utils/base64";
import PuffLoader from "react-spinners/PuffLoader";
import ApiHook from "../../../hooks/api-hook";
import MultipleFilms from "./multipleFilms";

const MultipleFilmsDBContainer = () => {
  const { fabriqueData, loading, error } = ApiHook(
    "http://localhost:5000/get-films",
    null
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
    <h1>There are some problem, please try to refresh</h1>;
  } else {
    return (
      <section className={classes.wrapper__films__container}>
        {fabriqueData.map((film) => (
          <MultipleFilms
            title={film.title}
            duration={film.duration}
            director={film.director}
            description={film.description}
            year={film.year}
            type={film.type}
            imageUrl={`data:image/png;base64,${base64ArrayBuffer(film)}`}
            key={film._id}
            _id={film._id}
          />
        ))}
      </section>
    );
  }
};

export default MultipleFilmsDBContainer;
