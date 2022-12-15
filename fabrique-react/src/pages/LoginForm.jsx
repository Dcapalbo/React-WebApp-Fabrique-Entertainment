import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import Footer from "../components/footer/footer";
import Login from "../components/UI/form/loginForm";

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
