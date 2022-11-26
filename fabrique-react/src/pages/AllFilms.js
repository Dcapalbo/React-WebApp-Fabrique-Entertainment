import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import MultipleFilmsDBContainer from "../components/UI/multipleFilms/multipleFilmsDbContainer";


const AllFilms = () => {
    return (
        <>
            <Header>
                <Navigation />
            </Header>
            <MultipleFilmsDBContainer />
        </>
    )
}

export default AllFilms;