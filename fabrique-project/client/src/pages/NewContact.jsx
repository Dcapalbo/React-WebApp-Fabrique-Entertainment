import AboutContactForm from "../components/UI/form/aboutContactForm";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const NewFilm = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <AboutContactForm />
      <Footer />
    </>
  );
};

export default NewFilm;
