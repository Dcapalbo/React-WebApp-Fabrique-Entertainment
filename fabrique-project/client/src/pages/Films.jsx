import FilmsContainer from "../components/UI/films/filmsContainer";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const Films = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <FilmsContainer />
      <Footer />
    </>
  );
};

export default Films;
