/** @format */

import CardContainer from "../components/UI/cardContainer/cardContainer";
import CompanyInfo from '../components/UI/companyInfo/companyInfo';
import { dataContactActions } from '../store/data-contact-slice';
import AboutCard from '../components/UI/aboutCard/aboutCard';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { serverUrl } from '../utils/constants';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const About = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dataContactActions.resetContactData());
	}, [dispatch]);

	return (
		<>
			<Header />
			<CompanyInfo />
			<CardContainer
				component={AboutCard}
				fetchDataUrl={`${serverUrl}/get-contacts`}
			/>
			<Footer />
		</>
	);
};

export default About;
