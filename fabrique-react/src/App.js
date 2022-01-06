import { Fragment } from "react";
import Header from "./components/header/header";
import classes from './assets/reset.scss';

function App() {
  return (
    <Fragment className={classes.html}>
      <Header />
    </Fragment>
  );
}

export default App;
