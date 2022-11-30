import PuffLoader from "react-spinners/PuffLoader";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navigation from "../components/nav/nav";
import { useParams } from "react-router-dom";
import ApiHook from "../hooks/api-hook";

const Films = () => {
  const { film } = useParams();
  if (film && film.length > 0) {
    const { fabriqueData, loading, error } = ApiHook(
      "https://localhost:5000/get-films",
      null
    );

    if (loading) {
      return (
        <PuffLoader
          style={{
            display: "inherit",
            position: "relative",
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
          color={"#cc0000"}
          size={100}
        />
      );
    } else if (error) {
      <h1>There is some problem, refresh the page</h1>;
    } else {
      if (film === "lucania") {
        return (
          <>
            <Header>
              <Navigation />
            </Header>
            <section>
              <div>
                {fabriqueData.map((film) => (
                  <div
                    description={film.description}
                    director={film.director}
                    imageurl={film.imageurl}
                    lenght={film.lenght}
                    title={film.title}
                    type={film.type}
                    key={film.id}
                  />
                ))}
              </div>
            </section>
            <Footer />
          </>
        );
      }
    }
  }
};

export default Films;
