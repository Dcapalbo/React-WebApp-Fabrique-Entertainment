import FilmCardContainer from "../components/UI/card/filmCardContainer";
import FilterDataSelect from "../components/UI/select/filterDataSelect";
import { dataSelectActions } from "../store/data-select-slice";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AllFilms = () => {
  const [type, setType] = useState("");
  const dispatch = useDispatch();

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
      <FilterDataSelect onChange={sendTypeHandler} type={type} />
      <FilmCardContainer />
      <Footer />
    </>
  );
};

export default AllFilms;
