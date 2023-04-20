import classes from "./aboutCardContainer.module.scss";
import PuffLoader from "react-spinners/PuffLoader";
import base64ArrayBuffer from "../../../utils/base64";
import ApiGetHook from "../../../hooks/apiGetHook";
import AboutCard from "./aboutCard";

const AboutCardContainer = () => {
  const { fabriqueData, loading, error } = ApiGetHook(
    `${process.env.REACT_APP_API_LOCAL_PORT}/get-contacts`
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
    <h1>There are some problems, refresh the page</h1>;
  } else {
    return (
      <section className={classes.about__wrapper__card__container}>
        <div className={classes.about__card__container}>
          {fabriqueData.length > 0 ? (
            fabriqueData.map((contact) => (
              <AboutCard
                name={contact.name}
                surname={contact.surname}
                role={contact.role}
                bio={contact.bio}
                email={contact.email}
                phoneNumber={contact.phoneNumber}
                slug={contact.slug}
                imageUrl={`data:image/png;base64,${base64ArrayBuffer(contact)}`}
                key={contact._id}
                _id={contact._id}
              />
            ))
          ) : (
            <h1>
              Non ci sono elementi per questa ricerca, inserirli manualmente
              presso la sezione del Database dedicata ai contatti
            </h1>
          )}
        </div>
      </section>
    );
  }
};

export default AboutCardContainer;
