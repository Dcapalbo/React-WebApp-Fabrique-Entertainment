import { cleanLocalStorage } from "../utils/functions";
import FilmForm from "../components/UI/form/filmForm";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const UpdateFilm = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilmForm />
      <Footer />
    </>
  );
};

export default UpdateFilm;
