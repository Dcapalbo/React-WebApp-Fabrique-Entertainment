/** @format */

import CardContainer from '../components/UI/cardContainer/cardContainer'; 
import FilmCard from '../components/UI/filmCard/filmCard';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { serverUrl } from "../utils/constants";
import React from 'react';

const Films = () => {
	return (
		<>
			<Header />
			<CardContainer
				component={FilmCard}
				fetchDataUrl={`${serverUrl}/get-films`}
			/>
			<Footer />
		</>
	);
};

export default Films;
