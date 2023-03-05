import AboutContactForm from "../components/UI/form/aboutContactForm";
import { cleanLocalStorage } from "../utils/functions";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const UpdateFilm = () => {
  cleanLocalStorage();

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

export default UpdateFilm;
