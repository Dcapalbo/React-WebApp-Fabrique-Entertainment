/** @format */

import CompanyPosition from '../components/UI/companyPosition/companyPosition';
import ContactInfo from '../components/UI/contactInfo/contactInfo';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import React from 'react';

const Contacts = () => {
	return (
		<>
			<Header />
			<CompanyPosition />
			<ContactInfo />
			<Footer />
		</>
	);
};

export default Contacts;
