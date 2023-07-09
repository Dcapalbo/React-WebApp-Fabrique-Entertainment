/** @format */

import AboutCardContainer from '../components/UI/aboutCard/aboutCardContainer';
import CompanyInfo from '../components/UI/companyInfo/companyInfo';
import { dataContactActions } from '../store/data-contact-slice';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const About = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dataContactActions.resetContactData());
	}, [dispatch]);

	return (
		<>
			<Header />
			<CompanyInfo />
			<AboutCardContainer />
			<Footer />
		</>
	);
};

export default About;
