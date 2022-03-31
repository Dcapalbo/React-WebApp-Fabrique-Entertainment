import { Fragment } from 'react';

import Header from "../components/header/header";
import Navigation from "../components/nav/nav";
import CompanyInfo from '../components/UI/companyInfo/companyInfo';
import CardContainer from '../components/UI/card/cardContainer';
import AboutCardContainer from '../components/UI/aboutCard/aboutCardContainer';

const About = () => {
    return (
        <Fragment>
            <Header>
                <Navigation/>
            </Header>
            <AboutCardContainer />
            <CompanyInfo />
            <CardContainer />
        </Fragment>
    )
}

export default About;