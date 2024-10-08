/** @format */

import CardContainer from '../components/UI/cardContainer/cardContainer';
import FilterDataSelect from '../components/UI/select/filterDataSelect';
import { dataSelectActions } from '../store/data-select-slice';
import Accordion from '../components/UI/accordion/accordion';
import { optionsFilms, serverUrl } from '../utils/constants';
import FilmCard from '../components/UI/filmCard/filmCard';
import React, { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Hero from '../components/hero/hero';
import { useDispatch } from 'react-redux';

const Home = () => {
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
			<Hero />
			<Accordion />
			<FilterDataSelect
				label={'Filtra per tipologia'}
				onChange={sendTypeHandler}
				headline={'Filmografia'}
				options={optionsFilms}
				type={type}
			/>
			<CardContainer
				component={FilmCard}
				fetchDataUrl={`${serverUrl}/get-films`}
				useFilter={true}
			/>
			<Footer />
		</>
	);
};

export default Home;
