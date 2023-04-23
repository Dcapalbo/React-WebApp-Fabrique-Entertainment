import FilmForm from "../components/UI/form/filmForm";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const NewFilm = () => {
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

export default NewFilm;
