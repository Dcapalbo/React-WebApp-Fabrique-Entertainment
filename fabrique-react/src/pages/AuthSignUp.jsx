import { cleanLocalStorage } from "../utils/functions";
import SignUp from "../components/UI/form/signUpForm";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const AuthSignUp = () => {
  cleanLocalStorage();

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <SignUp />
      <Footer />
    </>
  );
};

export default AuthSignUp;