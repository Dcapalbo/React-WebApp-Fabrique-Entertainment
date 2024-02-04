/** @format */

import CardContainer from '../components/UI/cardContainer/cardContainer';
import ArticleCard from '../components/UI/articleCard/articleCard';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { serverUrl } from '../utils/constants';
import React from 'react';

const News = () => {
	return (
		<>
			<Header />
			<CardContainer
				component={ArticleCard}
				fetchDataUrl={`${serverUrl}/get-articles`}
			/>
			<Footer />
		</>
	);
};

export default News;
