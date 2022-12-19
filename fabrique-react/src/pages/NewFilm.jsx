import { cleanLocalStorage } from "../utils/functions";
import FilmForm from "../components/UI/form/filmForm";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const NewFilm = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilmForm />
    </>
  );
};

export default NewFilm;
