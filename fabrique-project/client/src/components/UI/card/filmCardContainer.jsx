import { dataFilmActions } from "../../../store/data-film-slice";
import base64ArrayBuffer from "../../../utils/base64";
import { useSelector, useDispatch } from "react-redux";
import ApiGetHook from "../../../hooks/apiGetHook";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./cardContainer.module.scss";
import { useEffect, useState } from "react";
import FilmCard from "./filmCard";

const FilmCardContainer = () => {
  const dispatch = useDispatch();
  const typeData = useSelector((state) => state.dataType.dataType) || "";
  const [filteredData, setFilteredData] = useState([]);

  const { fabriqueData, loading, error } = ApiGetHook(
    `${process.env.REACT_APP_API_LOCAL_PORT}/get-films`
  );

  useEffect(() => {
    console.log("ao");
    dispatch(dataFilmActions.resetFilmData);
  }, [dispatch]);

  useEffect(() => {
    // Filter the data only when typeData is not empty
    if (typeData) {
      const filteredFabriqueData = fabriqueData.filter(
        (film) => film.type === typeData
      );
      setFilteredData(filteredFabriqueData);
    } else if (typeData === "") {
      setFilteredData(fabriqueData);
    } else {
      setFilteredData(fabriqueData);
    }
  }, [typeData, fabriqueData]);

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
      <section className={classes.wrapper__card__container}>
        <div
          className={
            (filteredData.length > 2
              ? classes.card__container
              : classes.card__container,
            classes.justify__content__center)
          }
        >
          {filteredData.map((film) => (
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
