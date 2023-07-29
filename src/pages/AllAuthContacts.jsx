/** @format */

import AboutCardContainer from '../components/UI/aboutCard/aboutCardContainer';
import { dataContactActions } from '../store/data-contact-slice';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';

const AllAuthContacts = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dataContactActions.resetContactData());
	}, [dispatch]);

	return (
		<>
			<Header />
			<AboutCardContainer />
			<Footer />
		</>
	);
};

export default AllAuthContacts;
