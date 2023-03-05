import FilmCardContainer from "../components/UI/card/filmCardContainer";
import { cleanLocalStorage } from "../utils/functions";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const AllFilms = () => {
  cleanLocalStorage();

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

export default AllFilms;
