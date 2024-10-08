/** @format */

import CardContainer from '../components/UI/cardContainer/cardContainer';
import FilterDataSelect from '../components/UI/select/filterDataSelect';
import ArticleCard from '../components/UI/articleCard/articleCard';
import { optionsArticles, serverUrl } from '../utils/constants';
import { dataSelectActions } from '../store/data-select-slice';
import React, { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { useDispatch } from 'react-redux';

const News = () => {
	const [type, setType] = useState('');
	const dispatch = useDispatch();

	const sendTypeHandler = (event) => {
		const value = event.target.value;
		dispatch(dataSelectActions.setDataType(value));
		setType(value);
	};

	useEffect(() => {
		return () => {
			dispatch(dataSelectActions.setDataType(''));
		};
	}, [dispatch]);

	return (
		<>
			<Header />
			<FilterDataSelect
				label={'Filtra per progetto'}
				onChange={sendTypeHandler}
				options={optionsArticles}
				headline={'Articoli'}
				type={type}
			/>
			<CardContainer
				component={ArticleCard}
				fetchDataUrl={`${serverUrl}/get-articles`}
				childComponentType={'Article'}
				useFilter={true}
			/>
			<Footer />
		</>
	);
};

export default News;
