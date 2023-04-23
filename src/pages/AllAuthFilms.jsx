import FilmCardContainer from "../components/UI/card/filmCardContainer";
import { dataFilmActions } from "../store/data-film-slice";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AllAuthFilms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataFilmActions.resetFilmData());
  }, [dispatch]);

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilmCardContainer />
      <Footer />
    </>
  );
};

export default AllAuthFilms;
