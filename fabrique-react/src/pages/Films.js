import MultipleFilmsContainer from "../components/UI/multipleFilms/multipleFilmsContainer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import Footer from "../components/footer/footer";

const Films = () => {
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
