import MultipleFilmsContainer from "../components/UI/multipleFilms/multipleFilmsContainer";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const AllFilms = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <MultipleFilmsContainer />
    </>
  );
};

export default AllFilms;
