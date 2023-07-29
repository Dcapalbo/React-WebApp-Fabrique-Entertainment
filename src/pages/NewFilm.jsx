/** @format */

import FilmForm from '../components/UI/form/filmForm';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import React from 'react';

const NewFilm = () => {
	return (
		<>
			<Header />
			<FilmForm />
			<Footer />
		</>
	);
};

export default NewFilm;
