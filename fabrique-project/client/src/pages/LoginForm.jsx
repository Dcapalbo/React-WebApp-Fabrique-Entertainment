import Login from "../components/UI/form/loginForm";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";

const LoginForm = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Login />
      <Footer />
    </>
  );
};

export default LoginForm;
