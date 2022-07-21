import MultipleFilmsContainer from '../components/UI/multipleFilms/multipleFilmsContainer';
import Header from "../components/header/header";
import Navigation from "../components/nav/nav";

const Films = () => {
    return (
        <>
            <Header>
                <Navigation/>
            </Header>
            <MultipleFilmsContainer />
        </>
    )
}

export default Films;