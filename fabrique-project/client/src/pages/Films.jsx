import MultipleFilmsContainer from "../components/UI/multipleFilms/multipleFilmsContainer";
import { cleanLocalStorage } from "../utils/functions";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const Films = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <MultipleFilmsContainer />
      <Footer />
    </>
  );
};

export default Films;
