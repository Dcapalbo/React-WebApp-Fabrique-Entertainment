import FilmCardContainer from "../components/UI/card/filmCardContainer";
import ContactForm from "../components/UI/form/contactForm";
import Accordion from "../components/UI/accordion/accordion";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import Hero from "../components/hero/hero";

const Home = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Hero />
      <Accordion />
      <FilmCardContainer />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
