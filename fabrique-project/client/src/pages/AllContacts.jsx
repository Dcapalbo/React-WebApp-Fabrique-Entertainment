import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";
import { cleanLocalStorage } from "../utils/functions";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const AllContacts = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <AboutCardContainer />
      <Footer />
    </>
  );
};

export default AllContacts;
