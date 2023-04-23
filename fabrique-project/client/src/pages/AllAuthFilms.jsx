import FilmCardContainer from "../components/UI/card/filmCardContainer";
import FilterDataSelect from "../components/UI/select/filterDataSelect";
import { dataSelectActions } from "../store/data-select-slice";
import { dataFilmActions } from "../store/data-film-slice";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AllAuthFilms = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(dataFilmActions.resetFilmData());
  }, [dispatch]);

  const sendTypeHandler = (event) => {
    const value = event.target.value;
    dispatch(dataSelectActions.setDataType(value));
    setType(value);
  };

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilterDataSelect onChange={sendTypeHandler} type={type} />
      <FilmCardContainer />
      <Footer />
    </>
  );
};

export default AllAuthFilms;
