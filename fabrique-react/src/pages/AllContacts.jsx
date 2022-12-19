import AboutCardContainer from "../components/UI/aboutCard/aboutCardContainer";
import { cleanLocalStorage } from "../utils/functions";
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
    </>
  );
};

export default AllContacts;
