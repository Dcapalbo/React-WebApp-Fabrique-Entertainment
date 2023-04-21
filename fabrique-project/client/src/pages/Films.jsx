import FilmsContainer from "../components/UI/films/filmsContainer";
import { dataFilmActions } from "../store/data-film-slice";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Films = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataFilmActions.resetFilmData());
  }, [dispatch]);

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilmsContainer />
      <Footer />
    </>
  );
};

export default Films;
