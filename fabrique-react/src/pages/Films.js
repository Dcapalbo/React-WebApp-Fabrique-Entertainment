import { Fragment } from 'react';

import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import MultipleFilmsContainer from '../components/UI/multipleFilms/multipleFilmsContainer';

const Films = () => {
    return (
        <Fragment>
            <Header>
                <Navigation/>
            </Header>
            <MultipleFilmsContainer />
        </Fragment>
    )
}

export default Films;