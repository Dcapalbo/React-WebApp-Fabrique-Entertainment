import classes from "./aboutCardContainer.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import ApiHook from "../../../hooks/api-hook";
import AboutCard from "./aboutCard";

const AboutCardContainer = () => {
  const { fabriqueData, loading, error } = ApiHook(
    "https://uvaf6p0qv3.execute-api.us-east-2.amazonaws.com/dev",
    "fabriqueContactsInformations"
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
    return (
      <section className={classes.about__wrapper__card__container}>
        <div className={classes.about__card__container}>
          {fabriqueData.map((contact) => (
            <AboutCard
              headline={contact.headline}
              imageUrl={contact.imageUrl}
              email={contact.email}
              role={contact.role}
              key={contact.id}
            />
          ))}
        </div>
      </section>
    );
  }
};

export default AboutCardContainer;
