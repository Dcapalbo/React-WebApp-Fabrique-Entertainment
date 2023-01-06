import PuffLoader from "react-spinners/PuffLoader";
import classes from "./dataFilm.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const DetailFilm = () => {
  useEffect(() => {
    let filmId;
    if (window.localStorage.getItem("filmId")) {
      filmId = JSON.parse(window.localStorage.getItem("filmId"));
    }
    const formData = new FormData();

    formData.append("_id", filmId.payload._id);
    if (formData !== {}) {
      setIsLoading(true);
      axios
        .post("http://localhost:5000/get-film", formData)
        .then((res) => {
          console.log(res.data);
          setFilmData(res.data);
        })
        .catch((err) => {
          console.error(
            "there is an error for addition of a new Contact: ",
            err.name
          );
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState([]);
  const [error, setError] = useState(null);

  return (
    <section className="">
      <div className="">{filmData.title}</div>
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
    </section>
  );
};

export default DetailFilm;
