import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import Footer from "../components/footer/footer";
import SignUp from "../components/UI/form/signUpForm";

const AuthSignUp = () => {
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
