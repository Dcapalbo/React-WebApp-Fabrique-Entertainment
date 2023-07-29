/** @format */

import FilmCardContainer from '../components/UI/card/filmCardContainer';
import FilterDataSelect from '../components/UI/select/filterDataSelect';
import { dataSelectActions } from '../store/data-select-slice';
import Accordion from '../components/UI/accordion/accordion';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Hero from '../components/hero/hero';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import React from 'react';

const Home = () => {
	const [type, setType] = useState('');
	const dispatch = useDispatch();

	const sendTypeHandler = (event) => {
		const value = event.target.value;
		dispatch(dataSelectActions.setDataType(value));
		setType(value);
	};

	return (
		<>
			<Header />
			<Hero />
			<Accordion />
			<FilterDataSelect
				onChange={sendTypeHandler}
				type={type}
			/>
			<FilmCardContainer />
			<Footer />
		</>
	);
};

export default Home;
