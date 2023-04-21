import FilterDataSelect from "../components/UI/select/filterDataSelect";
import FilmCardContainer from "../components/UI/card/filmCardContainer";
import { dataSelectActions } from "../store/data-select-slice";
import Accordion from "../components/UI/accordion/accordion";
import ContactForm from "../components/UI/form/contactForm";
import { dataFilmActions } from "../store/data-film-slice";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import { useState, useEffect } from "react";
import Hero from "../components/hero/hero";
import { useDispatch } from "react-redux";

const Home = () => {
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataFilmActions.resetFilmData);
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
      <Hero />
      <Accordion />
      <FilterDataSelect onChange={sendTypeHandler} type={type} />
      <FilmCardContainer />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
