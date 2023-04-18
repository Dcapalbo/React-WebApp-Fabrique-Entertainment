import FilmCardContainer from "../components/UI/card/filmCardContainer";
import ContactForm from "../components/UI/form/contactForm";
import Accordion from "../components/UI/accordion/accordion";
import TypeSelect from "../components/UI/select/typeSelect";
import { dataSelectActions } from "../store/data-select-slice";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import Hero from "../components/hero/hero";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  cleanLocalStorage();
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const sendTypeHandler = (event) => {
    const value = event.target.value;
    dispatch(dataSelectActions.setDataType(value));
    setType(value);
    axios
      .get(`http://localhost:5000/get-films-types?type=${value}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finished to fetch data");
      });
  };

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Hero />
      <Accordion />
      <TypeSelect onChange={sendTypeHandler} type={type} />
      <FilmCardContainer />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
